import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql'

const ProductType = new GraphQLObjectType({
    name: 'ProductType',
    fields: () => ({
        id: { type: GraphQLID },
        handle: { type: GraphQLString },
        vendor: { type: GraphQLString },
        productType: { type: GraphQLString },
        dateCreated: { type: GraphQLString },
        dateUpdated: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        images: { type: new GraphQLList(ProductImageType) },
        variants: { type: new GraphQLList(ProductVariantType) }
    })
})

const ProductImageType = new GraphQLObjectType({
    name: 'ProductImageType',
    fields: () => ({
        dateCreated: { type: GraphQLString },
        dateUpdated: { type: GraphQLString },
        src: { type: GraphQLString }
    })
})

const ProductVariantType = new GraphQLObjectType({
    name: 'ProductVariantType',
    fields: () => ({
        title: { type: GraphQLString },
        option: { type: GraphQLString },
        requiresShipping: { type: GraphQLBoolean },
        taxable: { type: GraphQLBoolean },
        featuredImage: { type: GraphQLString },
        available: { type: GraphQLBoolean },
        price: { type: GraphQLString },
        grams: { type: GraphQLInt }
    })
})

export { ProductType, ProductImageType, ProductVariantType }