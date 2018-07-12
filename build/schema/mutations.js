'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mutation = undefined;

var _graphql = require('graphql');

var _services = require('../services');

var _types = require('../schema/types');

const userService = new _services.UserService();
const productService = new _services.ProductService();

const mutation = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: _types.UserType,
            args: {
                firstName: { type: _graphql.GraphQLString },
                lastName: { type: _graphql.GraphQLString },
                gender: { type: _graphql.GraphQLString },
                email: { type: _graphql.GraphQLString }
            },
            resolve(parentValue, { firstName, lastName, gender, email }) {
                return userService.createUser({ firstName, lastName, gender, email });
            }
        }
    })
});

exports.mutation = mutation;