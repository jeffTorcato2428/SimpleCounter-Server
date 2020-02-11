import { GraphQLString } from "graphql";
import { GraphQLCounter } from "../nodes";
import CounterSchema from "../../../model/CounterSchema";

const CounterQuery = {
  type: GraphQLCounter,
  args: {
    id: {
      type: GraphQLString
    }
  },
  resolve: async (obj, { id }): Promise<any> => {
    const counterDoc = await CounterSchema.findById(id);
    if (!counterDoc) {
      const error = new Error("No counter found");
      error.code = 401;
      throw error;
    }
    return counterDoc;
  }
};

export { CounterQuery };
