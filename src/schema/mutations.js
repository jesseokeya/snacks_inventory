import { GraphQLObjectType, GraphQLString } from 'graphql'
import { UserService, ProductService } from '../services'
import { UserType, ProductType } from '../schema/types'

const userService = new UserService()
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
            async resolve(parentValue, { firstName, lastName, gender, email, password }) {
                return userService.createUser({ firstName, lastName, gender, email, password })
            }
        }
    })
})

export { mutation }