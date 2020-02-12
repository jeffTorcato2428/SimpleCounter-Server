import { mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLInt } from "graphql";

import { GraphQLCounter } from "../nodes";
import Counter from "../../../model/Counter";
import CounterSchema, { ICounter } from "../../../model/CounterSchema";

type Payload = {
  counter: ICounter;
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
    newCounter: {
      type: new GraphQLNonNull(GraphQLCounter),
      resolve: async ({ _id }) => await Counter.getCounter(_id)
    }
  },
  mutateAndGetPayload: async ({ counterInput }): Promise<any> => {
    //console.log(counterInput);
    const counter = await Counter.changeCounter(counterInput);
    //console.log(counter)
    return { _id: counter._id.toString() };
  }
});

export { UpdateCounterMutation };
