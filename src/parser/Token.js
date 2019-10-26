/**
 * the Factory of TokenValue
 *
 * @param {string} rawValue
 *  The raw string value
 *
 * @param {TokenValuePosition} position
 *  The position data of the token in the sourceText
 */
export function Token(textContent, position) {
  return new TokenValue(textContent, position)
}

/**
 * A value type used to represent text content
 * that's gone through the tokenization process
 */
export class TokenValue {
  /**
   * The positionnal data of the text content within the original
   * text
   * @type {TokenValuePosition}
   *
   * @typedef TokenValuePosition
   * @property {number} line
   * @property {number} column
   */
  position

  /**
   * The tokenized text content
   * @type {string}
   */
  textContent

  /**
   * @inheritdoc
   * @param {string} textContent
   * @param {TokenValuePosition} position
   */
  constructor(textContent, position) {
    this.position = position
    this.textContent = textContent
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name
  }

  /**
   * Converts into its textual represention.
   * @returns {string} the value of the {@link TokenValue#textContent} property
   */
  toString() {
    return this.textContent
  }
}
