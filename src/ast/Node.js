export class ASTNode {
  constructor(token) {
    this.token = token
  }

  static from(token) {
    return new this()
  }

  attach(node) {
    if (this.child == null) {
      this.child = node
      node.parent = this

      return node
    }

    return this.child.attach(node)
  }
}
