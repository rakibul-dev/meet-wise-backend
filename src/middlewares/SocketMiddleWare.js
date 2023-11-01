// const jwt = require("jsonwebtoken");
const VerifySocketClientToken = (socket, next, user) => {
  //   const token = socket.handshake.auth.authtoken
  //   console.log("verify =====>", socket.handshake);
  socket.user = user;

  console.log({ socket });
  //   try {
  //     const DecodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
  //     socket.user = DecodedToken;
  //   } catch (error) {
  //     const SocketError = new Error("You are un authorized");
  //     return next(SocketError);
  //   }

  next();
};

module.exports = VerifySocketClientToken;
