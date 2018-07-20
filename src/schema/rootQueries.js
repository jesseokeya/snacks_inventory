import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql'
import { UserService, ProductService } from '../services'
import { UserType, ProductType } from './types'

const userService = new UserService()
const productService = new ProductService()

const query = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        Users: {
            type: GraphQLList(UserType),
            resolve(parentValue, args, req) {
                return userService.getUsers()
            }
        },
        Products: {
            type: GraphQLList(ProductType),
            resolve(parentValue, args) {
                return productService.getProducts()
            }
        },
        getUserById: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return userService.getUserById(args.id)
            }
        },
        getProductById: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return productService.getProductById(args.id)
            }
        }
    })
});

export { query }