import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from "graphql";

import {} from "../nodes";
import Counter from "../../../model/Counter";
import CounterSchema from "../../../model/CounterSchema";

type Payload = {
  counter: object;
};

const CounterInputDataType = new GraphQLInputObjectType({
  name: "CounterInputData",
  fields: {
    counter: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
});

const UpdateCounterMutation = mutationWithClientMutationId({
  name: "UpdateCounter",
  inputFields: {
    counterInput: {
      type: GraphQLNonNull(CounterInputDataType)
    }
  },
  outputFields: {
    counter: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async ({ _id }) => {
        const counter = await CounterSchema.findById(_id);
        if (!counter) {
          throw new Error(``);
        }
        return {
          node: counter
        };
      }
    }
  },
  mutateAndGetPayload: async ({ counterInput }): Promise<Payload> => {
    console.log(counterInput);
    const counter = await Counter.changeCounter(counterInput);
    return { counter };
  }
});

export { UpdateCounterMutation };
