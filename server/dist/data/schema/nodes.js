"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var graphql_relay_1 = require("graphql-relay");
var Counter_1 = __importDefault(require("../../model/Counter"));
var _a = graphql_relay_1.nodeDefinitions(function (globalId) {
    var _a = graphql_relay_1.fromGlobalId(globalId), type = _a.type, id = _a.id;
    if (type === "Counter") {
        return Counter_1.default.getCounter();
    }
    return null;
}, function (obj) {
    if (obj instanceof Counter_1.default) {
        return GraphQLCounter;
    }
    return null;
}), nodeInterface = _a.nodeInterface, nodeField = _a.nodeField;
exports.nodeField = nodeField;
var GraphQLCounter = new graphql_1.GraphQLObjectType({
    name: "Counter",
    fields: {
        id: graphql_relay_1.globalIdField("Counter"),
        counter: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            resolve: function (counter) { return counter.counter; }
        }
    },
    interfaces: [nodeInterface]
});
exports.GraphQLCounter = GraphQLCounter;
//# sourceMappingURL=nodes.js.map