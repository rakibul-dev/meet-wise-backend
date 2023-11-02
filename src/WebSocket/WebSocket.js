const VerifySocketClientToken = require("../middlewares/SocketMiddleWare");
// const VerifySocketUserAuthToken = require("../middlewares/SocketMiddleware/SocketAuth");
// const {
//   JoinUserToeveryRoom,
// } = require("./WsEventHandlers/RoomHandlers/RoomsHandaler");
const {
  CreateSocketServerInstance,
} = require("./SocketContainer/SocketContainer");
const { sessionMiddleware } = require("../app");

// const { GetOnlineUsers } = require("./SocketServerStore/SocketServerStore");

const WsUserConnectionHandler = require("./WsEventHandlers/ConnetionHandlers/NewSocketUserConnectionHandler");
const {
  DisconnectedSocketUserHandler,
} = require("./WsEventHandlers/ConnetionHandlers/SocketUserDisconnectHandler");

const CreateSocketServer = (server) => {
  // Initiate socket server
  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.FRONTEND_BASE_URL,

      method: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });
  // ******* //
  io.engine.use(sessionMiddleware);
  // Giving io instance to the socket container
  CreateSocketServerInstance(io);
  // ******* //

  // ***** //

  //   Middleware for socket user connectivity

  // Sending Online Users
  //   const EmitOnlineUsers = () => {
  //     const FoundedOnlineUsers = GetOnlineUsers();
  //     io.emit("online-users", { FoundedOnlineUsers });
  //     // io.to("649628d29d11ef1346c0130f").emit("newMessage", () => {
  //     //   "i am group message";
  //     //   console.log("sending ");
  //     // });
  //   };
  // ***** //

  io.engine.use((req, res, next) => {
    // const jsonObject = JSON.parse(req);
    // do something
    if (req.session) {
      const pure = Object(req.session.passport);
      //   socket.user = pure.user;
      next();

      //   console.log("socket req ===========>", pure.user);
      io.use((socket, next) => {
        VerifySocketClientToken(socket, next, req.session.passport);
      });
    }
  });
  io.on("connection", (socket) => {
    // console.log(socket.user);
    WsUserConnectionHandler.NewSocketUserConnectionHandler(socket, io);
    // console.log("hand shake ====>", socket.handshake.session);
    // socket.user = socket.request.session.user;
    // NewSocketUserConnectionHandler(socket, io);
    // WsUserConnectionHandler.NewSocketUserConnectionHandler(socket, io);
    // EmitOnlineUsers();
    // JoinUserToeveryRoom(socket);
    socket.on("disconnect", () => {
      DisconnectedSocketUserHandler(socket);
    });
    // socket.on("hello-from-group", (data) => {
    //   console.log(data);
    //   socket.to("649628d29d11ef1346c0130f").emit("newMessage", {
    //     content: "i am group message",
    //   });
    // });
  });

  function getConnectedUsers(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) {
      return [];
    }

    const sockets = Array.from(room);
    // const connectedUsers = sockets.map((socketId) => {
    //   return io.sockets.sockets.get(socketId).username; // Replace with your user identifier
    // });

    console.log("connected room users======>", sockets);
    // return connectedUsers;
  }

  // Send interval events
  //   setInterval(() => {
  //     EmitOnlineUsers();
  //     getConnectedUsers("649628d29d11ef1346c0130f");
  //   }, [1000 * 5]);
};

module.exports = { CreateSocketServer };
