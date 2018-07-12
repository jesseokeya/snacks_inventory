'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _rootQueries = require('./rootQueries');

var _mutations = require('./mutations');

const schema = new _graphql.GraphQLSchema({ query: _rootQueries.query, mutation: _mutations.mutation });

exports.schema = schema;