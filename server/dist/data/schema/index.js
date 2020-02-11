"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var CounterQuery_1 = require("./queries/CounterQuery");
var nodes_1 = require("./nodes");
var UpdateCounterMutation_1 = require("./mutations/UpdateCounterMutation");
var RootMutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        updateCounter: UpdateCounterMutation_1.UpdateCounterMutation,
        node: nodes_1.nodeField
    }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        counter: CounterQuery_1.CounterQuery
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
//# sourceMappingURL=index.js.map