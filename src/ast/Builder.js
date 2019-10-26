import {ASTNode} from './Node.js'

export class ASTBuilder {
  #root

  addToken(token) {
    const node = ASTNode.from(token)

    if (this.#root) {
      this.#root.attach(node)
    } else {
      this.#root = node
    }

    return this
  }

  build() {
    return this.#root
  }
}
