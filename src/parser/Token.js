export class Token {
  static from(value) {
    return new this(value)
  }

  #value

  constructor(value) {
    this.#value = value
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }

  toString() {
    return `${this.constructor.name}(${this.#value})`
  }

  valueOf() {
    return this.#value
  }
}
