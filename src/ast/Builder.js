import {ASTNode} from './Node.js'

export class ASTBuilder {
  #root

  add(token) {
    const node = ASTNode.from(token)

    if (this.#root) {
      this.#root.link(node)
    } else {
      this.#root = node
    }

    return this
  }

  build() {
    return this.#root
  }
}
