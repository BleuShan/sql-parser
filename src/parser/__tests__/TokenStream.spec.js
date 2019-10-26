import {TokenStream} from '../TokenStream.js'
import {Token} from '../Token.js'

describe('a TokenStream', () => {
  it.each`
    statement           | expectedValues
    ${'a test'}         | ${[Token.from('a'), Token.from('test')]}
    ${'a test '}        | ${[Token.from('a'), Token.from('test')]}
    ${'a  test  '}      | ${[Token.from('a'), Token.from('test')]}
    ${' a test'}        | ${[Token.from('a'), Token.from('test')]}
    ${'  a test'}       | ${[Token.from('a'), Token.from('test')]}
    ${' a test  '}      | ${[Token.from('a'), Token.from('test')]}
    ${' a    test  '}   | ${[Token.from('a'), Token.from('test')]}
    ${' a\n    test  '} | ${[Token.from('a'), Token.from('test')]}
  `(
    `should yield $expectedValues when created from '$statement'`,
    ({statement, expectedValues}) => {
      const stream = TokenStream.from(statement)

      expect(Array.from(stream).toString()).toEqual(expectedValues.toString())
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
