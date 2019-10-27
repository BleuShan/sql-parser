import {tokenize} from './Tokenizer.js'

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
   *
   * @returns {TokenStream} a new {@link TokenStream} instance
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
      this.#iterator = tokenize(this.#source)
    }

    return this.#iterator
  }

  /**
   * Resets the stream iterator to the start of the source text
   * @returns {this} the {@link TokenStream} instance from which it was called
   */
  reset() {
    if (this.#iterator != null) {
      this.#iterator.reset()
    }

    return this
  }
}
