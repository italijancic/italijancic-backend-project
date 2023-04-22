export default class ProductDTO {

  constructor(product) {
    this.id = product._id || product.id
    this.title = product.title
    this.description = product.description
    this.code = product.code
    this.price = product.price
    this.status = product.status
    this.stock = product.stock
    this.category = product.category
    this.thumbnails = product.thumbnails
    this.owner = product.owner || 'admin'
    this.deleted = product.deleted
    this.createdAt = product.createdAt
    this.updatedAt = product.updatedAt
  }

}