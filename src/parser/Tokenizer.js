// eslint-disable-next-line no-unused-vars
import {WHITESPACE_REGEX, LINE_FEED} from './constants.js'
// eslint-disable-next-line no-unused-vars
import {Token} from './Token.js'

const isArray = Array.isArray

/**
 * Lazily transforms some text content into a set of {@link TokenValue}
 * @param {string} source the text content to process
 */
export function tokenize(source) {
  return new TokenizingIterator(source)
}

/**
 * An IterableIterator that lazily transform text content into a collection of {@link TokenValue}
 */
export class TokenizingIterator {
  #position = {
    line: 1,
    column: 1,
    index: 0
  }

  #source

  #value

  #hasCompleted = false

  #memoized = {
    buffer: '',
    results: [],
    sourceIndex: -1
  }

  /**
   * Indicates if the iterator is done
   * @type {boolean}
   */
  get done() {
    const {index} = this.#position
    const source = isArray(this.#memoized) ? this.#memoized : this.#source
    return index > source.length
  }

  /**
   * The current iterator value
   * @type {TokenValue}
   */
  get value() {
    if (isArray(this.#memoized)) {
      const {index} = this.#position
      const targetIndex = Math.min(index, this.#memoized.length - 1)
      this.#value = this.#memoized[targetIndex]
    }

    return this.#value
  }

  /**
   * @inheritdoc
   * @param {string} source the text content to process
   */
  constructor(source) {
    this.#source = source
  }

  /**
   * Updates the iterator value to the next value in the sequence
   * @returns {this} the {@link TokenizingIterator} instance from which it was called
   */
  next() {
    if (isArray(this.#memoized)) {
      return this.#updatePosition()
    }

    this.#value = null
    while (!this.done) {
      const {index} = this.#position

      this.#updatePosition().#updateValue(index)

      if (this.value != null) {
        break
      }
    }

    if (this.done) {
      this.#memoized = this.#memoized.results
      this.#value = undefined
    }

    return this
  }

  /**
   * Resets the iterator position
   */
  reset() {
    this.#position = {
      line: 1,
      column: 1,
      index: 0
    }
    return this
  }

  // eslint-disable-next-line no-undef
  #updatePosition() {
    this.#position.index += 1

    if (isArray(this.#memoized)) {
      return this
    }

    const char = this.#source[this.#position.index]
    if (char === LINE_FEED) {
      this.#position.line += 1
      this.#position.column = 0
    } else {
      this.#position.column += 1
    }

    return this
  }

  // eslint-disable-next-line no-undef
  #updateValue(index) {
    if (isArray(this.#memoized)) {
      return this
    }

    let {buffer, results, sourceIndex} = this.#memoized

    const current = this.#source[index]
    const next = this.#source[index + 1]

    if (current && !WHITESPACE_REGEX.test(current)) {
      buffer += current
      this.#memoized = {
        ...this.#memoized,
        buffer
      }
    }

    if (buffer && (WHITESPACE_REGEX.test(next) || !next)) {
      const {line, column} = this.#position
      const {length: span} = buffer
      this.#value = Token(buffer, {
        line,
        column: Math.max(column - span, 1),
        span
      })

      results.push(this.#value)
      sourceIndex = index
      buffer = ''
      this.#memoized = {
        results,
        buffer,
        sourceIndex
      }
    }

    return this
  }
}
