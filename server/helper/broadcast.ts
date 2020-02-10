const sendMessageToAll = (json, clients) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map(client => {
    clients[client].send(json);
  });
};

const sendMessageToOne = (json, client) => {
  client.send(json);
};

export { sendMessageToAll, sendMessageToOne };
