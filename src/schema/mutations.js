import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import { UserService, ProductService, AuthService } from '../services'
import { UserType, ProductType } from '../schema/types'

const userService = new UserService({ AuthService })
const productService = new ProductService()

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                gender: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (_, { firstName, lastName, gender, email, password }) => {
                return userService.createUser({ firstName, lastName, gender, email, password })
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: (_, { id }) => {
                return userService.deleteUser(id)
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (_, { id, firstName, lastName, email, password }) => {
                return userService.updateUser({ id, firstName, lastName, email, password })
            }
        },
        createProduct: {
            type: ProductType,
            description: `\n images JSON object should 'src' field: example -> images: "{ "src": "image_source_url" }"
            \n variants JSON object should 'title', 'options', 'requiresShipping', 'taxable', 'featuredImage' 
            'available', 'price', 'grams' fields: example -> variants: "{}" \n`,
            args: {
                title: { type: GraphQLString },
                handle: { type: GraphQLString },
                vendor: { type: GraphQLString },
                productType: { type: GraphQLString },
                tags: { type: new GraphQLList(GraphQLString) },
                images: { type: new GraphQLList(GraphQLJSON) },
                variants: { type: new GraphQLList(GraphQLJSON) }
            },
            resolve: (_, args) => {
                return productService.createProduct(args)
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                handle: { type: GraphQLString },
                vendor: { type: GraphQLString },
                productType: { type: GraphQLString },
                tags: { type: new GraphQLList(GraphQLString) },
                images: { type: new GraphQLList(GraphQLJSON) },
                variants: { type: new GraphQLList(GraphQLJSON) }
            },
            resolve: (_, args) => {
                return productService.updateProduct(args)
            }
        }
    })
})

export { mutation }