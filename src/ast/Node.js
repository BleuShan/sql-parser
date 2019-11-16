export class ASTNode {
  constructor(token) {
    this.token = token
  }

  static from(token) {
    return new this(token)
  }

  link(node) {
    if (this.next == null) {
      this.next = node
      node.previous = this

      return node
    }

    return this.next.link(node)
  }
}
