"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendMessage = function (json, clients) {
    // We are sending the current data to all connected clients
    Object.keys(clients).map(function (client) {
        clients[client].send(json);
    });
};
exports.default = sendMessage;
//# sourceMappingURL=broadcast.js.map