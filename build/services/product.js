'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductService = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _products = require('../models/products');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductService extends _products.ProductSchema {
    constructor(options = {}) {
        super(), this.product = this.model('Product');
    }

    async getProducts() {
        return this.product.find({}, (err, products) => {
            if (err) throw err;
            return products;
        });
    }
}

exports.ProductService = ProductService;