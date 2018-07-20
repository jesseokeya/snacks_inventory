'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductService = undefined;

var _products = require('../models/products');

var _customLogger = require('custom-logger');

var _customLogger2 = _interopRequireDefault(_customLogger);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductService extends _products.ProductSchema {
    constructor(options = {}) {
        super(), this.product = this.model('Product');
    }

    async getProducts() {
        return this.product.find({}, (err, products) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to get all products`), err;

            return _customLogger2.default.info('successfully fetched all products'), products;
        });
    }

    async getProductById(_id) {
        return this.product.findOne({ _id }, (err, product) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to get product ${_id} by id`), err;

            return _customLogger2.default.info(`successfully fetched product ${_id} by id`), product;
        });
    }

    async createProduct(params) {
        const newProduct = new this.product(params);

        return newProduct.dateUpdated = new Date().toISOString(), newProduct.dateCreated = new Date().toISOString(), (0, _lodash.isObject)(newProduct.images[0]) ? (newProduct.images['dateCreated'] = new Date().toISOString(), newProduct.images['dateUpdated'] = new Date().toISOString()) : newProduct.images = {
            dateCreated: new Date().toISOString(),
            dataUpdated: new Date().toISOString(),
            src: 'https://cdn-tp1.mozu.com/21830-33325/resources/images/no-product-image.png?_mzcb=_1528467086423'
        }, newProduct.save().then(product => (_customLogger2.default.info('successfully created a new product'), product)).catch(err => {
            if (err) throw _customLogger2.default.error(`error occured when trying to create a new product`), err;
        });
    }

    async deleteProduct(_id) {
        return this.product.deleteOne({ _id }, err => {
            if (err) throw _customLogger2.default.error(`error occured when trying to delete product ${_id} by id`), err;

            _customLogger2.default.info(`product ${_id} was successfully deleted`);
        });
    }

    async updateProduct(params) {
        const _id = params.id;
        const dataUpdated = {};
        for (let param in params) !isNil(param) && !isNil(params[param]) && (dataUpdated[param] = params[param]);

        return dataUpdated.dateUpdated = new Date().toISOString(), dataUpdated.images[0]['dateUpdated'] = new Date().toISOString(), this.product.updateOne({ _id }, dataUpdated, (err, updated) => {
            if (err) throw _customLogger2.default.error(`error occured when trying to update product ${_id}`), err;

            return _customLogger2.default.info(`product ${_id} was successfully updated`), updated;
        });
    }
}

exports.ProductService = ProductService;