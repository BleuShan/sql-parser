import {TokenStream} from './TokenStream.js'

export class ParserBuilder {
  options = {}

  build() {
    return new Parser(this)
  }
}

export class Parser {
  #tokenStream
  #options

  constructor(builder) {
    this.#options = builder.options
  }

  static builder() {
    return new ParserBuilder()
  }

  parse(statement) {
    this.#tokenStream = TokenStream.from(statement)
  }
}
