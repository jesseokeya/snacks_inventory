import mongoose from 'mongoose'
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
}

export { ProductService }