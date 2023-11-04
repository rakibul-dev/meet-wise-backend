const http = require("http");
const { app } = require("./app");
const SocketServer = require("./WebSocket/WebSocket");

const port = process.env.PORT;
app.set("port", port);

// const server = http.createServer(app);

// server.listen(port, () => {
//   console.log(`Server is running on port ${port} 🖥️`);
// });

//Creatin socket server
const server = http.createServer(app);
SocketServer.CreateSocketServer(server);
// Running server
server.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on aws port  ${process.env.PORT} ⚙️ hurrey`
  );
});
