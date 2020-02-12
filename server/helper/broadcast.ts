import WebSocket = require("ws");

const sendMessageToAll = (json: JSON, clients: any) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map(client => {
    clients[client].send(json);
  });
};

const sendMessageToOne = (json: JSON, client: any) => {
  client.send(json);
};

export { sendMessageToAll, sendMessageToOne };
