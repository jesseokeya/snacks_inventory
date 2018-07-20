'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mutation = undefined;

var _graphql = require('graphql');

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _services = require('../services');

var _types = require('../schema/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userService = new _services.UserService({ AuthService: _services.AuthService });
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
                email: { type: _graphql.GraphQLString },
                password: { type: _graphql.GraphQLString }
            },
            resolve: (_, { firstName, lastName, gender, email, password }) => userService.createUser({ firstName, lastName, gender, email, password })
        },
        deleteUser: {
            type: _types.UserType,
            args: { id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) } },
            resolve: (_, { id }) => userService.deleteUser(id)
        },
        updateUser: {
            type: _types.UserType,
            args: {
                id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
                firstName: { type: _graphql.GraphQLString },
                lastName: { type: _graphql.GraphQLString },
                email: { type: _graphql.GraphQLString },
                password: { type: _graphql.GraphQLString }
            },
            resolve: (_, { id, firstName, lastName, email, password }) => userService.updateUser({ id, firstName, lastName, email, password })
        },
        createProduct: {
            type: _types.ProductType,
            description: `\n images JSON object should 'src' field: example -> images: "{ "src": "image_source_url" }"
            \n variants JSON object should 'title', 'options', 'requiresShipping', 'taxable', 'featuredImage' 
            'available', 'price', 'grams' fields: example -> variants: "{}" \n`,
            args: {
                title: { type: _graphql.GraphQLString },
                handle: { type: _graphql.GraphQLString },
                vendor: { type: _graphql.GraphQLString },
                productType: { type: _graphql.GraphQLString },
                tags: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
                images: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) },
                variants: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) }
            },
            resolve: (_, args) => productService.createProduct(args)
        },
        updateProduct: {
            type: _types.ProductType,
            args: {
                id: { type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID) },
                title: { type: _graphql.GraphQLString },
                handle: { type: _graphql.GraphQLString },
                vendor: { type: _graphql.GraphQLString },
                productType: { type: _graphql.GraphQLString },
                tags: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
                images: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) },
                variants: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) }
            },
            resolve: (_, args) => productService.updateProduct(args)
        }
    })
});

exports.mutation = mutation;