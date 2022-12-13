import fs from 'fs'

export class CartManager {

  constructor(path) {
    this.carts = []
    this.path = path
  }

  async createNewCart() {
    try {

      await this.#readCarts()

      const newCart = {
        id: this.#getMaxId() + 1,
        products: []
      }

      this.carts.push(newCart)

      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')

    } catch (error) {
      throw new Error('Error adding new cart')
    }
  }

  async #readCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        this.carts = carts
      } else {
        this.carts = []
      }
    } catch (error) {
      throw new Error('Error reading products from file')
    }
  }

  #getMaxId() {
    let maxId = 0
    this.carts.map((cart) => {
      if (cart.id > maxId) maxId = cart.id
    })
    return maxId
  }

}