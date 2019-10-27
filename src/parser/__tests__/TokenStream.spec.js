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
  ])(`created from '%s' should yield '%p'`, (statement, expectedValues) => {
    const stream = TokenStream.from(statement)

    expect(Array.from(stream)).toEqual(expectedValues)
  })

  describe('iterator', () => {
    const stream = TokenStream.from('a b c d')
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
      expect(result).toEqual(['a', 'b'])

      for (const value of stream) {
        result.push(value.text)
      }

      expect(result).toEqual(['a', 'b', 'c', 'd'])
    })
  })
})
