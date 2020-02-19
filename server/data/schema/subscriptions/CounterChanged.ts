import { GraphQLObjectType } from 'graphql'
import { GraphQLCounter } from '../nodes'
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Counter from '../../../model/Counter';
const pubsub = new RedisPubSub();

const RootSubscription = new GraphQLObjectType({
    name: 'RootSubscription',
    description: 'Root Subscription',
    fields: {
        counterChanged: {
            type: GraphQLCounter,
            subscribe: () => pubsub.asyncIterator('counterChanged'),
            resolve: (payload: Counter) => payload
        }
    }
})

export default RootSubscription