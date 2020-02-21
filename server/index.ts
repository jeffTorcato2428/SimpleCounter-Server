import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import * as http from "http";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import { GraphQLError, execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { schema } from "./data/schema";
import MongoHelper from "./helper/database";
import GraphQLHttpHandler from "./helper/graphQLHandler";
import GraphQLPlayground from "./helper/graphQLPlayground";

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

app.use("/api/graphql", GraphQLHttpHandler());

app.get("/playground", GraphQLPlayground());

mongoHelper
  .mongoConnect()
  .then(() => {
    const port = process.env.PORT;
    const server = app.listen(port, () => {
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
