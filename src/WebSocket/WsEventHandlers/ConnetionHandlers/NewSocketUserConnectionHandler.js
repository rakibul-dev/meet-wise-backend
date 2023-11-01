const {
  AddNewUserToStore,
} = require("../../SocketServerStore/SocketServerStore");

const NewSocketUserConnectionHandler = async (socket, io) => {
  //   const UserDetails = socket.user;

  let UserDetails = socket.user;
  console.log("socket user Details ====>", UserDetails);
  AddNewUserToStore({ SocketId: socket.id, userId: UserDetails.user._id });
};

module.exports = { NewSocketUserConnectionHandler };
