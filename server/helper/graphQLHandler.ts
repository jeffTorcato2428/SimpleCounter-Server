import graphqlHTTP from "express-graphql";
import { schema } from "../data/schema";
import { GraphQLError } from "graphql";

const GraphQLHttpHandler = () => {
  return graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn: (err: GraphQLError) => {
      if (!err.originalError) {
        return err;
      }
      const message = err.message || "An error occured.";
      const data = err.originalError.stack;
      return { message: message, data: data };
    }
  });
};

export default GraphQLHttpHandler;
