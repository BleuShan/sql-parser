import {TokenStream} from './TokenStream.js'

/**
 * a builder to configure a new {@link Parser} instance
 */
export class ParserBuilder {
  options = {}

  /**
   * Creates a new parser from the configured options
   * @returns a new {@link Parser} instance
   */
  build() {
    return new Parser(this)
  }
}

/**
 * An instance of a parser
 */
export class Parser {
  #tokenStream
  #options

  /**
   * @inheritdoc
   * @param {ParserBuilder} builder
   */
  constructor(builder) {
    this.#options = builder.options
  }

  /**
   * Creates a builder to configure a new {@link Parser} instance
   * @returns {ParserBuilder} a new {@link ParserBuilder} instance
   */
  static builder() {
    return new ParserBuilder()
  }

  /**
   * Parse the text content into a
   * @param {string} textContent
   */
  parse(textContent) {
    this.#tokenStream = TokenStream.from(textContent)
  }
}
