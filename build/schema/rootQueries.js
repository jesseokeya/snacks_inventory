'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.query = undefined;

var _graphql = require('graphql');

var _services = require('../services');

var _types = require('./types');

const userService = new _services.UserService();
const productService = new _services.ProductService();

const query = new _graphql.GraphQLObjectType({
    name: 'query',
    fields: () => ({
        User: {
            type: _types.UserType,
            resolve(parentValue, args, req) {
                return userService.getUsers();
            }
        },
        Product: {
            type: _types.ProductType,
            resolve(parentValue, args, req) {
                return productService.getProducts();
            }
        }
    })
});

exports.query = query;