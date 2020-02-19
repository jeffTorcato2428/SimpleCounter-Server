import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { CounterQuery } from './queries/CounterQuery'
import { nodeField } from './nodes'
import { UpdateCounterMutation } from './mutations/UpdateCounterMutation'
import RootSubscription from './subscriptions/CounterChanged'


const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateCounter: UpdateCounterMutation
    }
})

const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        counter: CounterQuery,
        node: nodeField
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    subscription: RootSubscription
})