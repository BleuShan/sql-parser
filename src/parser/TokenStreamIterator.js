import {WHITESPACE_REGEX} from './constants.js'
import {Token} from './Token.js'

export class TokenStreamIterator {
  #index = 0
  #source

  constructor(source) {
    this.#source = source
  }

  next() {
    let value = ''
    let current
    let next
    do {
      current = this.#source[this.#index++]
      next = this.#source[this.#index]
      if (WHITESPACE_REGEX.test(current)) {
        continue
      }

      if (current) {
        value += current

        if (value && WHITESPACE_REGEX.test(next)) {
          return {
            value: Token.from(value),
            done: !next
          }
        }
      }
    } while (next)

    return {
      done: !next
    }
  }
}
