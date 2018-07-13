import { ProductSchema } from '../models/products'

class ProductService extends ProductSchema {
    constructor(options = {}) {
        super()
        this.product = this.model('Product')
    }

    async getProducts() {
        return this.product.find({}, (err, products) => {
            if (err) { throw err }
            return products
        })
    }

    async getProductById(_id) {
        return this.product.findOne({ _id }, (err, product) => {
            if (err) { throw err }
            return product
        })
    }

    async createProduct(params) {}

    async deleteProduct(_id) {}

    async updateProduct(_id) {}
}

export { ProductService }