import GraphQLJSON from 'graphql-type-json'
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
        title: { type: GraphQLString },
        handle: { type: GraphQLString },
        vendor: { type: GraphQLString },
        productType: { type: GraphQLString },
        dateCreated: { type: GraphQLString },
        dateUpdated: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        images: { type: new GraphQLList(GraphQLJSON) },
        variants: { type: new GraphQLList(GraphQLJSON) }
    })
})

export { ProductType }