'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserType = undefined;

var _graphql = require('graphql');

const UserType = new _graphql.GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: _graphql.GraphQLID },
        firstName: { type: _graphql.GraphQLString },
        lastName: { type: _graphql.GraphQLString },
        gender: { type: _graphql.GraphQLString },
        email: { type: _graphql.GraphQLString },
        password: { type: _graphql.GraphQLString },
        avatar: { type: _graphql.GraphQLString },
        faveSnack: { type: _graphql.GraphQLString },
        dateCreated: { type: _graphql.GraphQLString },
        dateUpdated: { type: _graphql.GraphQLString }
    }
});

exports.UserType = UserType;