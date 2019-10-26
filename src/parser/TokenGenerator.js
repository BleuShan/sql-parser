import {WHITESPACE_REGEX, LINE_FEED} from './constants.js'
import {Token} from './Token.js'

/**
 * Lazily transforms some text content into a set of {@link TokenValue}
 * @param {string} source the text content to process
 */
export function* TokenGenerator(source) {
  let buffer = ''
  const position = {
    line: 1,
    column: 1
  }

  for (let i = 0; i < source.length; i++) {
    const current = source[i]
    const next = source[i + 1]

    if (next === LINE_FEED) {
      position.line += 1
      position.column = 0
    } else {
      position.column += 1
    }

    if (!WHITESPACE_REGEX.test(current)) {
      buffer += current
    }

    if (buffer && (WHITESPACE_REGEX.test(next) || !next)) {
      const {line, column} = position
      const {length: span} = buffer
      yield Token(buffer, {
        line,
        column: Math.max(column - span, 1)
      })
      buffer = ''
    }
  }
}
