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

  async addProductToCart (cartId, productId) {
    try {
      const cart = await this.getCartById(cartId)
      const cartIndex = this.carts.findIndex((cart) => cart.id === cartId)

      // Che if product allready exist
      const productIndex = cart.products.findIndex((product) => product.id === productId)

      if (productIndex !== -1) {
        // Update quantity
        const updatedProducts = cart.products.map((product, index) => {
          if (index === productIndex) {
            return {
              id: product.id,
              quantity: product.quantity + 1
            }
          } else {
            return product
          }
        })
        cart.products = updatedProducts
      } else {
        // Add new product to cart
        const product = {
          id: productId,
          quantity: 1
        }
        cart.products.push(product)
      }

      const updatedCarts = this.carts.map((element, index) => {
        if (index === cartIndex) {
          return {
            id: element.id,
            products: cart.products
          }
        } else {
          return element
        }
      })

      this.carts = updatedCarts
      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCarts () {
    try {
      await this.#readCarts()
      return this.carts
    } catch (error) {
      throw new Error('Error reading carts from file')
    }
  }

  async getCartById (cartId) {
    try {
      await this.#readCarts()
      const foundedCart = this.carts.find((cart) => cart.id === cartId)
      if (foundedCart) {
        return foundedCart
      } else {
        throw new Error('Bad or missing Cart Id. Cart not found')
      }

    } catch (error) {
      throw new Error(error.message)
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