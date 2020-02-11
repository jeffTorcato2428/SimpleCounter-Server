"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_pino_logger_1 = __importDefault(require("express-pino-logger"));
var mongoose_1 = require("mongoose");
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var redis_1 = __importDefault(require("redis"));
dotenv_1.default.config();
var app = express_1.default();
var redisPublisher = redis_1.default.createClient();
var redisSubscriber = redis_1.default.createClient();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(express_pino_logger_1.default);
app.get("/", function (req, res) {
    // res.setHeader("Content-Type", "application/json");
    //res.send(JSON.stringify({ greeting: `Sup!` }));
    res.send('Hello from the other side!');
});
app.get("/api/greeting", function (req, res) {
    var name = req.query.name || "World";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: "Hello " + name + "!" }));
});
// app.use(
//   "/api/graphql",
//   graphqlHTTP({
//     schema: schema,
//     pretty: true,
//     graphiql: true,
//     customFormatErrorFn: err => {
//       if (!err.originalError) {
//         return err;
//       }
//       const data = err.originalError.data;
//       const message = err.message || "An error occured.";
//       const code = err.originalError.code || 500;
//       return { message: message, status: code, data: data };
//     }
//   })
// );
var server = http.createServer(app);
var port = process.env.PORT;
server.listen(3002);
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
mongoose_1.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(function (result) {
    console.log("[Connected to database]");
})
    .catch(function (err) { return console.log(err); });
process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});
//# sourceMappingURL=index.js.map