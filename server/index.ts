import express from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import webSocket from "ws";
import * as http from "http";
import cors from "cors";
import redis from "redis";
import socketio from "socket.io";
import redisAdapter from "socket.io-redis";

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

let _counter = 0;

io.on("connection", socket => {
  socket.emit("socket connection", { counter: _counter });

  socket.on("counter change", ({ counter }) => {
    _counter = counter;
    socket.broadcast.emit("server response", { counter: _counter });
  });

  socket.on("disconnect", () => {
    io.emit("user disconnected");
  });
});

server.listen(3001, () =>
  console.log(`Express server is running on http://localhost:3001`)
);

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
