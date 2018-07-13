import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql'

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        avatar: { type: GraphQLString },
        faveSnack: { type: GraphQLString },
        dateCreated: { type: GraphQLString },
        dateUpdated: { type: GraphQLString }
    }
})

export { UserType }