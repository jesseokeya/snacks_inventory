'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductVariantType = exports.ProductImageType = exports.ProductType = undefined;

var _graphql = require('graphql');

const ProductType = new _graphql.GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: { type: _graphql.GraphQLID },
        handle: { type: _graphql.GraphQLString },
        vendor: { type: _graphql.GraphQLString },
        productType: { type: _graphql.GraphQLString },
        dateCreated: { type: _graphql.GraphQLString },
        dateUpdated: { type: _graphql.GraphQLString },
        tags: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        images: { type: new _graphql.GraphQLList(ProductImageType) },
        variants: { type: new _graphql.GraphQLList(ProductVariantType) }
    })
});

const ProductImageType = new _graphql.GraphQLObjectType({
    name: 'ProductImageType',
    fields: () => ({
        dateCreated: { type: _graphql.GraphQLString },
        dateUpdated: { type: _graphql.GraphQLString },
        src: { type: _graphql.GraphQLString }
    })
});

const ProductVariantType = new _graphql.GraphQLObjectType({
    name: 'ProductVariantType',
    fields: () => ({
        title: { type: _graphql.GraphQLString },
        option: { type: _graphql.GraphQLString },
        requiresShipping: { type: _graphql.GraphQLBoolean },
        taxable: { type: _graphql.GraphQLBoolean },
        featuredImage: { type: _graphql.GraphQLString },
        available: { type: _graphql.GraphQLBoolean },
        price: { type: _graphql.GraphQLString },
        grams: { type: _graphql.GraphQLInt }
    })
});

exports.ProductType = ProductType;
exports.ProductImageType = ProductImageType;
exports.ProductVariantType = ProductVariantType;