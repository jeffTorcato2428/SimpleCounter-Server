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
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_pino_logger_1 = __importDefault(require("express-pino-logger"));
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var redis_1 = __importDefault(require("redis"));
var socket_io_1 = __importDefault(require("socket.io"));
var socket_io_redis_1 = __importDefault(require("socket.io-redis"));
var app = express_1.default();
var redisPublisher = redis_1.default.createClient();
var redisSubscriber = redis_1.default.createClient();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(express_pino_logger_1.default);
app.get("/api/greeting", function (req, res) {
    var name = req.query.name || "World";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: "Hello " + name + "!" }));
});
var server = http.createServer(app);
var io = socket_io_1.default(server);
io.adapter(socket_io_redis_1.default({
    host: "localhost",
    port: 6379,
    pubClient: redisPublisher,
    subClient: redisSubscriber
}));
var _counter = 0;
io.on("connection", function (socket) {
    socket.emit("socket connection", { counter: _counter });
    socket.on("counter change", function (_a) {
        var counter = _a.counter;
        _counter = counter;
        socket.broadcast.emit("server response", { counter: _counter });
    });
    socket.on("disconnect", function () {
        io.emit("user disconnected");
    });
});
server.listen(3001, function () {
    return console.log("Express server is running on http://localhost:3001");
});
process.on("uncaughtException", function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});
//# sourceMappingURL=index.js.map