const {
  ConnectedUserStore,
} = require('../../SocketServerStore/SocketServerStore')

const DisconnectedSocketUserHandler = (socket) => {
  if (ConnectedUserStore.has(socket.id)) {
    ConnectedUserStore.delete(socket.id)
    console.log('user disconected', ConnectedUserStore)
  }
}

module.exports = { DisconnectedSocketUserHandler }
