import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'
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
            resolve(parentValue, { firstName, lastName, gender, email, password }) {
                return userService.createUser({ firstName, lastName, gender, email, password })
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
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
            resolve(parentValue, { id, firstName, lastName, email, password }) {
                console.log('ecfrfwrfw')
                return userService.updateUser({ id, firstName, lastName, email, password })
            }
        }
    })
})

export { mutation }