const sendMessage = (json, clients) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map(client => {
    clients[client].send(json);
  });
};

export default sendMessage;
