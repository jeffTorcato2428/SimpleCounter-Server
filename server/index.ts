import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import { connect } from "mongoose";
import * as http from "http";
import cors from "cors";
import redis from "redis";
import socketio from "socket.io";
import redisAdapter from "socket.io-redis";
import graphqlHTTP from "express-graphql";

import Counter from "./model/Counter";
import { schema } from "./data/schema";

dotenv.config();
const app = express();
const redisPublisher = redis.createClient();
const redisSubscriber = redis.createClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Sup!` }));
});

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn: err => {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occured.";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    }
  })
);

const server = http.createServer(app);
/*const io = socketio(server);

io.adapter(
  redisAdapter({
    host: "localhost",
    port: 6379,
    pubClient: redisPublisher,
    subClient: redisSubscriber
  })
);

io.on("connection", socket => {
  Counter.getCounter()
    .then(data => {
      socket.emit("socket connection", {
        counter: data
      });
    })
    .catch(err => console.error(err));

  socket.on("counter change", ({ counter }) => {
    Counter.changeCounter(counter)
      .then(() => {
        socket.broadcast.emit("server response", { counter: counter });
      })
      .catch(err => console.error(err));
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });
});*/

if (typeof process.env.MONGO_URL == "undefined") {
  throw new Error("MongoDB Url is not set");
}

connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then((result: any) => {
    console.log("[Connected to database]");
    const port = process.env.PORT;
    server.listen(port, () =>
      console.log(`Express server is running on http://localhost:${port}`)
    );
  })
  .catch((err: any) => console.log(err));

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
