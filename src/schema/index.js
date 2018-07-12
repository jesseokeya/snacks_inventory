import { GraphQLSchema } from 'graphql'
import { query } from './rootQueries'
import { mutation } from './mutations'

const schema = new GraphQLSchema({ query, mutation })

export { schema }