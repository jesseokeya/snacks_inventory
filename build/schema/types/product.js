'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductType = undefined;

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductType = new _graphql.GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: { type: _graphql.GraphQLID },
        title: { type: _graphql.GraphQLString },
        handle: { type: _graphql.GraphQLString },
        vendor: { type: _graphql.GraphQLString },
        productType: { type: _graphql.GraphQLString },
        dateCreated: { type: _graphql.GraphQLString },
        dateUpdated: { type: _graphql.GraphQLString },
        tags: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        images: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) },
        variants: { type: new _graphql.GraphQLList(_graphqlTypeJson2.default) }
    })
});

exports.ProductType = ProductType;