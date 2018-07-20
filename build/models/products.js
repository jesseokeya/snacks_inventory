'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Product = new _mongoose2.default.Schema({
    title: {
        type: String,
        required: true
    },
    handle: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    vendor: {
        type: String,
    },
    productType: {
        type: String
    },
    tags: {
        type: Array, "default": []
    },
    variants: [{
        title: String,
        option: String,
        requiresShipping: Boolean,
        taxable: Boolean,
        featuredImage: String,
        available: Boolean,
        price: String,
        grams: Number
    }],
    images: [{
        dateCreated: Date,
        dateUpdated: Date,
        src: String
    }]
});

const ProductSchema = _mongoose2.default.model('Product', Product);

exports.ProductSchema = ProductSchema;