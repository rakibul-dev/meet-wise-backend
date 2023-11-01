const User = require('../../../Models/User')
const FriendRequest = require('../../../Models/FriendRequest')
const {
  GetAllActiveConnections,
} = require('../../SocketServerStore/SocketServerStore')
const {
  GetSocketSeverInstance,
} = require('../../SocketContainer/SocketContainer')

const SendRealtimeFriendRequest = async (userId) => {
  const sendPendingInvitations = await FriendRequest.find({
    reciverId: userId,
  })
    .populate('reciverId')
    .exec()

  //   console.log('sendPendingInvitations ======>', sendPendingInvitations)

  // Find  active socket connections of specific userId
  const EventRiciverList = GetAllActiveConnections(userId)

  const io = GetSocketSeverInstance()

  EventRiciverList.forEach((ReciversocketId) => {
    io.to(ReciversocketId).emit('friend-request', {
      sendPendingInvitations: sendPendingInvitations
        ? sendPendingInvitations
        : [],
    })
    console.log('ReciversocketId', ReciversocketId)
  })
}

module.exports = { SendRealtimeFriendRequest }
