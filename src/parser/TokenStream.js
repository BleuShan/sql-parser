import {TokenStreamIterator} from './TokenStreamIterator'

export class TokenStream {
  static from(source) {
    return new this(source)
  }

  #source
  #iterator
  constructor(source) {
    this.#source = source
  }

  [Symbol.iterator]() {
    if (this.#iterator == null || this.#iterator.done) {
      this.#iterator = new TokenStreamIterator(this.#source)
    }

    return this.#iterator
  }

  reset() {
    this.#iterator = null
    return this
  }
}
