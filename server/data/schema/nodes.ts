import { GraphQLNonNull, GraphQLInt, GraphQLObjectType } from "graphql";

import { nodeDefinitions, fromGlobalId, globalIdField } from "graphql-relay";
import Counter from "../../model/Counter";

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId: string) => {
    const { type, id }: { id: string; type: string } = fromGlobalId(globalId);

    if (type === "Counter") {
      return Counter.getCounter();
    }

    return null;
  },
  (obj: {}): GraphQLObjectType | null => {
    if (obj instanceof Counter) {
      return GraphQLCounter;
    }
    return null;
  }
);

const GraphQLCounter = new GraphQLObjectType({
  name: "Counter",
  fields: {
    id: globalIdField("Counter"),
    counter: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (counter: Counter): number => counter.counter
    }
  },
  interfaces: [nodeInterface]
});

export { nodeField, GraphQLCounter };
