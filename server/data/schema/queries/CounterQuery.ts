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
  resolve: async (obj: any, args:any , ctx: any): Promise<any> => {
    const counterDoc = await CounterSchema.findById(args.id);
    //console.log(counterDoc);
    if (!counterDoc) {
      const error = new Error("No counter found");
      throw error;
    }
    return counterDoc;
  }
};

export { CounterQuery };
