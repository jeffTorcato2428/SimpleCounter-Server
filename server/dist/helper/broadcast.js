"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendMessageToAll = function (json, clients) {
    // We are sending the current data to all connected clients
    Object.keys(clients).map(function (client) {
        clients[client].send(json);
    });
};
exports.sendMessageToAll = sendMessageToAll;
var sendMessageToOne = function (json, client) {
    client.send(json);
};
exports.sendMessageToOne = sendMessageToOne;
//# sourceMappingURL=broadcast.js.map