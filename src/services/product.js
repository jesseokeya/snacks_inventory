import { ProductSchema } from '../models/products'
import logger from 'custom-logger'
import { isObject } from 'lodash'

class ProductService extends ProductSchema {
    constructor(options = {}) {
        super()
        this.product = this.model('Product')
    }

    async getProducts() {
        return this.product.find({}, (err, products) => {
            if (err) {
                logger.error(`error occured when trying to get all products`)
                throw err
            }
            logger.info('successfully fetched all products')
            return products
        })
    }

    async getProductById(_id) {
        return this.product.findOne({ _id }, (err, product) => {
            if (err) {
                logger.error(`error occured when trying to get product ${_id} by id`)
                throw err
            }
            logger.info(`successfully fetched product ${_id} by id`)
            return product
        })
    }

    async createProduct(params) {
        const newProduct = new this.product(params)
        newProduct.dateUpdated = new Date().toISOString()
        newProduct.dateCreated = new Date().toISOString()
        if (isObject(newProduct.images[0])) {
            newProduct.images['dateCreated'] = new Date().toISOString()
            newProduct.images['dateUpdated'] = new Date().toISOString()
        }
        return newProduct.save()
            .then(user => user).catch(err => {
                if (err) {
                    logger.error(`error occured when trying to create a new product`)
                    throw err
                }
                logger.info('successfully created a new product')
            })
    }

    async deleteProduct(_id) {
        return this.product.deleteOne({ _id }, (err) => {
            if (err) {
                logger.error(`error occured when trying to delete product ${_id} by id`)
                throw err
            }
            logger.info(`product ${_id} was successfully deleted`)
        })
    }

    async updateProduct(_id) {
        const dataUpdated = {}
        for (let param in params) {
            if (!isNil(param) && !isNil(params[param])) {
                dataUpdated[param] = params[param]
            }
        }
        dataUpdated.dateUpdated = new Date().toISOString()
        dataUpdated.images[0]['dateUpdated'] = new Date().toISOString()
        return this.product.updateOne({ _id }, dataUpdated, (err, updated) => {
            if (err) { 
                logger.error(`error occured when trying to update product ${_id}`)
                throw err 
            }
            logger.info(`product ${_id} was successfully updated`)
            return updated
        })
    }
}

export { ProductService }