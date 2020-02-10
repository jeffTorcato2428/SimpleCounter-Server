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
import Counter from "./model/Counter";

dotenv.config();
const app = express();
const redisPublisher = redis.createClient();
const redisSubscriber = redis.createClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const server = http.createServer(app);
const io = socketio(server);

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
});

connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then((result: any) => {
    console.log("[Connected to database]");
    server.listen(3001, () =>
      console.log(`Express server is running on http://localhost:3001`)
    );
  })
  .catch((err: any) => console.log(err));

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
