import {TokenGenerator} from './TokenGenerator.js'

/**
 * A stream of token value extracted from a textual source
 */
export class TokenStream {
  /**
   * Creates a new {@link TokenStream} instance from
   * a given source
   *
   * @param {string} source
   * The textual value from which {@link TokenStream} will extract its values
   */
  static from(source) {
    return new this(source)
  }

  #source
  #iterator
  constructor(source) {
    this.#source = source
  }

  [Symbol.iterator]() {
    if (this.#iterator == null) {
      this.#iterator = TokenGenerator(this.#source)
    }

    return this.#iterator
  }

  /**
   * Resets the stream iterator to the start of the source text
   * @returns {this} the token stream instance from which it was called
   */
  reset() {
    this.#iterator = null
    return this
  }
}
