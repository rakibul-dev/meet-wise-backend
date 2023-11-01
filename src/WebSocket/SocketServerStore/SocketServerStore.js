const ConnectedUserStore = new Map();
const ActiveRooms = [];
const AddNewUserToStore = ({ SocketId, userId }) => {
  ConnectedUserStore.set(SocketId, { userId });
  console.log("Connected Socket User ===>", ConnectedUserStore);
};

const GetAllActiveConnections = (userId) => {
  const ActiveSocketConnections = [];
  ConnectedUserStore.forEach((value, key) => {
    console.log({ key, userId, value });
    if (value.userId === userId) {
      ActiveSocketConnections.push(key);
    }
  });

  return ActiveSocketConnections;
};

const GetOnlineUsers = () => {
  const OnlineUsers = [];
  ConnectedUserStore.forEach((value, key) => {
    OnlineUsers.push({ socketId: key, userId: value.userId });
  });
  return OnlineUsers;
};

function getConnectedUsers(roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) {
    return [];
  }

  const sockets = Array.from(room.sockets.values());
  const connectedUsers = sockets.map((socketId) => {
    return io.sockets.sockets.get(socketId).username; // Replace with your user identifier
  });

  return connectedUsers;
}

// Rooms
const CreateNewRoom = () => {};
module.exports = {
  AddNewUserToStore,
  ConnectedUserStore,
  GetAllActiveConnections,
  GetOnlineUsers,
  getConnectedUsers,
};
