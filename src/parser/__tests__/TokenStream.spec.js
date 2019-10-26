import {TokenStream} from '../TokenStream.js'
import {Token} from '../Token.js'

describe('a TokenStream', () => {
  it.each`
    statement          | expectedValues
    ${'a test'}        | ${[Token('a', {line: 1, column: 1}), Token('test', {line: 1, column: 3})]}
    ${'a test '}       | ${[Token('a', {line: 1, column: 1}), Token('test', {line: 1, column: 3})]}
    ${'a  test  '}     | ${[Token('a', {line: 1, column: 1}), Token('test', {line: 1, column: 4})]}
    ${' a test'}       | ${[Token('a', {line: 1, column: 2}), Token('test', {line: 1, column: 4})]}
    ${'  a test'}      | ${[Token('a', {line: 1, column: 3}), Token('test', {line: 1, column: 5})]}
    ${' a test  '}     | ${[Token('a', {line: 1, column: 2}), Token('test', {line: 1, column: 4})]}
    ${' a \ntest  '}   | ${[Token('a', {line: 1, column: 2}), Token('test', {line: 2, column: 1})]}
    ${' a \r\ntest  '} | ${[Token('a', {line: 1, column: 2}), Token('test', {line: 2, column: 1})]}
  `(
    `should yield $expectedValues when created from '$statement'`,
    ({statement, expectedValues}) => {
      const stream = TokenStream.from(statement)

      expect(Array.from(stream)).toEqual(expectedValues)
    }
  )

  describe('iterator implementation', () => {
    let stream
    beforeEach(() => {
      stream = TokenStream.from('a b c d')
    })

    it('should share the iterator instances', () => {
      const a = stream[Symbol.iterator]()
      const b = stream[Symbol.iterator]()
      expect(a).toBe(b)
    })
  })
})
