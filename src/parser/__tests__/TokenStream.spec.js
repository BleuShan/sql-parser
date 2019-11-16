import {TokenStream} from '../TokenStream.js'
import {Token} from '../Token.js'

describe('a TokenStream', () => {
  it.each([
    [
      'a test',
      [Token('a', {line: 1, column: 1, span: 1}), Token('test', {line: 1, column: 3, span: 4})]
    ],
    [
      'a test ',
      [Token('a', {line: 1, column: 1, span: 1}), Token('test', {line: 1, column: 3, span: 4})]
    ],
    [
      'a  test  ',
      [Token('a', {line: 1, column: 1, span: 1}), Token('test', {line: 1, column: 4, span: 4})]
    ],
    [
      ' a test',
      [Token('a', {line: 1, column: 2, span: 1}), Token('test', {line: 1, column: 4, span: 4})]
    ],
    [
      '  a test',
      [Token('a', {line: 1, column: 3, span: 1}), Token('test', {line: 1, column: 5, span: 4})]
    ],
    [
      ' a test  ',
      [Token('a', {line: 1, column: 2, span: 1}), Token('test', {line: 1, column: 4, span: 4})]
    ],
    [
      ' a \ntest  ',
      [Token('a', {line: 1, column: 2, span: 1}), Token('test', {line: 2, column: 1, span: 4})]
    ],
    [
      ' a \r\ntest  ',
      [Token('a', {line: 1, column: 2, span: 1}), Token('test', {line: 2, column: 1, span: 4})]
    ]
  ])(`created from '%s' should yield '%o'`, (statement, expectedValues) => {
    const stream = TokenStream.from(statement)

    expect(Array.from(stream)).toEqual(expectedValues)
  })

  describe('values', () => {
    let stream
    const statement = `Hello!\nHello World!`

    beforeEach(() => {
      stream = TokenStream.from(statement)
    })

    it('should have enough information to approximate the original text', () => {
      let previousPosition
      let result = ''
      for (const value of stream) {
        const {position} = value
        if (previousPosition != null) {
          if (previousPosition.line < position.line) {
            result += '\n'
          }
          const spaceCount = position.column - previousPosition.column - previousPosition.span
          for (let i = 0; i < spaceCount; i++) {
            result += ' '
          }
        }
        result = `${result}${value}`
        previousPosition = position
      }

      expect(result).toEqual(statement)
    })
  })

  describe('iterator', () => {
    const stream = TokenStream.from('a b c d')
    const expectedValues = ['a', 'b', 'c', 'd']
    beforeEach(() => {
      stream.reset()
    })

    it('should share instances', () => {
      const a = stream[Symbol.iterator]()
      const b = stream[Symbol.iterator]()
      expect(a).toBe(b)
    })

    it('should allow pausing and resuming', () => {
      const result = []
      for (const value of stream) {
        result.push(value.text)
        if (result.length === 2) {
          break
        }
      }
      expect(result).toEqual(expectedValues.slice(0, 2))

      for (const value of stream) {
        result.push(value.text)
      }

      expect(result).toEqual(expectedValues)
    })

    it('should allow reuse', () => {
      const result = []
      for (const value of stream) {
        result.push(value.text)
      }

      expect(result).toEqual(expectedValues)
    })
  })
})
