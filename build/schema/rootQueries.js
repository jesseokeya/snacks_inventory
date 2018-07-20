'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.query = undefined;

var _graphql = require('graphql');

var _services = require('../services');

var _types = require('./types');

const userService = new _services.UserService({ AuthService: _services.AuthService });
const productService = new _services.ProductService();

const query = new _graphql.GraphQLObjectType({
    name: 'query',
    fields: () => ({
        Users: {
            type: (0, _graphql.GraphQLList)(_types.UserType),
            resolve: () => userService.getUsers()
        },
        Products: {
            type: (0, _graphql.GraphQLList)(_types.ProductType),
            resolve: async () => productService.getProducts()
        },
        getUserById: {
            type: _types.UserType,
            args: { id: { type: _graphql.GraphQLID } },
            resolve: (_, args) => userService.getUserById(args.id)
        },
        getProductById: {
            type: _types.ProductType,
            args: { id: { type: _graphql.GraphQLID } },
            resolve: (_, args) => productService.getProductById(args.id)
        }
    })
});

exports.query = query;