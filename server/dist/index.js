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
var ws_1 = __importDefault(require("ws"));
var http = __importStar(require("http"));
var cors_1 = __importDefault(require("cors"));
var uniqueID_1 = __importDefault(require("./helper/uniqueID"));
var typeDef_1 = __importDefault(require("./types/typeDef"));
var broadcast_1 = require("./helper/broadcast");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(express_pino_logger_1.default);
app.get("/api/greeting", function (req, res) {
    var name = req.query.name || "World";
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: "Hello " + name + "!" }));
});
var server = http.createServer(app);
var wss = new ws_1.default.Server({ server: server, clientTracking: true });
var clients = {};
var counter = 0;
wss.on("connection", function (ws, req) {
    var userId = uniqueID_1.default();
    console.log(new Date() +
        " Recieved a new connection from " +
        req.connection.remoteAddress +
        ".");
    clients[userId] = ws;
    ws.on("message", function (message) {
        console.log(message);
        var dataFromClient = JSON.parse(message);
        var json = { type: dataFromClient.type };
        if (dataFromClient.type === typeDef_1.default.COUNTER_CHANGE) {
            counter = dataFromClient.counter;
            json.data = { counter: counter };
            broadcast_1.sendMessageToAll(JSON.stringify(json), clients);
        }
        else if (dataFromClient.type === typeDef_1.default.INITIAL_HANDSHAKE) {
            broadcast_1.sendMessageToOne(JSON.stringify({ data: { counter: counter }, type: typeDef_1.default.COUNTER_CHANGE }), ws);
        }
    });
    ws.on("close", function (connection) {
        console.log(new Date() + " Peer " + userId + " disconnected.");
        delete clients[userId];
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