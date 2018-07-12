import { GraphQLObjectType } from 'graphql'
import { UserService, ProductService } from '../services'
import { UserType, ProductType } from './types'

const userService = new UserService()
const productService = new ProductService()

const query = new GraphQLObjectType({
    name: 'query',
    fields: () => ({
        User: {
            type: UserType,
            resolve(parentValue, args, req) {
                return userService.getUsers()
            }
        },
        Product: {
            type: ProductType,
            resolve(parentValue, args, req) {
                return productService.getProducts()
            }
        }
    })
});

export { query }