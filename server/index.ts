import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import * as http from "http";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import { GraphQLError, execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import expressPlayground from "graphql-playground-middleware-express";

import { schema } from "./data/schema";
import MongoHelper from "./helper/database";

dotenv.config();
const app = express();
const mongoHelper = new MongoHelper();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(pino());

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Sup!` }));
});

app.use(
  "/api/graphql",
  graphqlHTTP({
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
  })
);

app.get(
  "/playground",
  expressPlayground({
    endpoint: "/api/graphql",
    subscriptionEndpoint: `ws://localhost:3001/subscriptions`
  })
);

const server = http.createServer(app);

mongoHelper
  .mongoConnect()
  .then(() => {
    const port = process.env.PORT;
    server.listen(port, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema: schema
        },
        {
          server: server,
          path: "/subscriptions"
        }
      );
      console.log(`Express server is running on http://localhost:${port}`);
      console.log(
        `Subscriptions are running on ws://localhost:${port}/subscriptions`
      );
    });
  })
  .catch(err => {
    console.log(err);
  });

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
