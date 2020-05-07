import expressPlayground from "graphql-playground-middleware-express";

const GraphQLPlayground = () => {
  return expressPlayground({
    endpoint: "/api/graphql",
    subscriptionEndpoint: `ws://localhost:3001/subscriptions`
  });
};

export default GraphQLPlayground;
