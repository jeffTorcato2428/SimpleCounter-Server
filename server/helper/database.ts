import CounterSchema from "../model/CounterSchema";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { connect } from "mongoose";

class MongoHelper {
  MONGO_URL: string;
  pubsub: RedisPubSub;

  constructor() {
    if (typeof process.env.MONGO_URL == "undefined") {
      throw new Error("MongoDB Url is not set");
    } else {
      this.MONGO_URL = process.env.MONGO_URL;
    }

    this.pubsub = new RedisPubSub();
    this.mongoConnect = this.mongoConnect.bind(this);
    this.mongoWatch = this.mongoWatch.bind(this);
  }

  mongoConnect = async () => {
    try {
      await connect(this.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log("[Connected to Database]");
      this.mongoWatch();
    } catch (error) {
      console.error(error);
    }
  };

  mongoWatch = () => {
    return CounterSchema.watch().on("change", data => {
      //console.log(data);
      this.pubsub.publish("counterChanged", {
        ...data.documentKey,
        ...data.updateDescription.updatedFields
      });
    });
  };
}

export default MongoHelper;
