import express from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import webSocket from "ws";
import * as http from "http";
import cors from "cors";
import getUniqueID from "./helper/uniqueID";
import typesDef from "./types/typeDef";
import sendMessage from "./helper/broadcast";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(pino);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

const server = http.createServer(app);

const wss = new webSocket.Server({ server, clientTracking: true });

const clients: any = {};
let counter = 0;

wss.on("connection", (ws: webSocket, req: http.IncomingMessage) => {
  const userId = getUniqueID();
  console.log(
    new Date() +
      " Recieved a new connection from " +
      req.connection.remoteAddress +
      "."
  );
  clients[userId] = ws;

  ws.on("message", (message: string) => {
    console.log(message);
    const dataFromClient = JSON.parse(message);
    const json = { type: dataFromClient.type };
    if (dataFromClient.type === typesDef.COUNTER_CHANGE) {
      counter = dataFromClient.counter;
      json.data = { counter };
    }
    sendMessage(JSON.stringify(json), clients);
  });

  ws.on("close", connection => {
    console.log(new Date() + " Peer " + userId + " disconnected.");
    delete clients[userId];
  });
});

server.listen(3001, () =>
  console.log(`Express server is running on http://localhost:3001`)
);

process.on("uncaughtException", function(err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
