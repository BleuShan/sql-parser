/**
 * The positionnal data of a {@link TokenValue} within the original text
 *
 * @typedef TokenValuePosition
 * @property {number} line
 *  the line number where to find the {@link TokenValue}
 *
 * @property {number} column
 *  the column number where the {@link TokenValue} starts
 *
 * @property {number} span
 *  the length of textual representation of {@link TokenValue}
 */

/**
 * the Factory of TokenValue
 *
 * @param {string} text
 *  The raw string value
 *
 * @param {TokenValuePosition} position
 *  The position data of the token in the sourceText
 */
export function Token(text, position) {
  return new TokenValue(text, position)
}

/**
 * A value type used to represent text content that's gone through some tokenization process
 */
export class TokenValue {
  /**
   * The positionnal data of the text content within the original text
   * @type {TokenValuePosition}
   */
  position

  /**
   * The tokenized text content
   * @type {string}
   */
  text

  /**
   * @inheritdoc
   * @param {string} text
   * @param {TokenValuePosition} position
   */
  constructor(text, position) {
    this.position = position
    this.text = text
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name
  }

  /**
   * Converts into its textual represention.
   * @returns {string} the value of the {@link TokenValue#text} property
   */
  toString() {
    return this.text
  }
}
