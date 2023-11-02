const Message = require("./MessageModel");
const Conversation = require("../conversation/ConversationModel");
const {
  GetSocketSeverInstance,
} = require("../../WebSocket/SocketContainer/SocketContainer");
const {
  GetAllActiveConnections,
} = require("../../WebSocket/SocketServerStore/SocketServerStore");
exports.sendMessage = async (req, res) => {
  try {
    const io = GetSocketSeverInstance();
    const { senderId, reciverId, message } = req.body;
    console.log({ senderId, reciverId, message });
    const isConversationExist = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).exec();

    if (isConversationExist) {
      const setLastMessage = await await Conversation.findOneAndUpdate(
        {
          participants: { $all: [senderId, reciverId] },
        },
        { lastMessage: message },
        { new: true }
      ).exec();

      const messageSent = await new Message({
        sender: senderId,
        reciver: reciverId,
        message,
        conversation: isConversationExist._id,
      }).save();

      const EventRiciverList = GetAllActiveConnections(reciverId.toString());

      EventRiciverList.forEach((ReciversocketId) => {
        io.to(ReciversocketId).emit("message", {
          message: messageSent,
        });
        console.log("ReciversocketId", ReciversocketId);
      });
      res.json(messageSent);
    } else {
      const conversation = await new Conversation({
        participants: [senderId, reciverId],
      }).save();
      const messageSent = await new Message({
        sender: senderId,
        reciver: reciverId,
        message,
        conversation: conversation._id,
      }).save();
      const EventRiciverList = GetAllActiveConnections(reciverId.toString());

      EventRiciverList.forEach((ReciversocketId) => {
        io.to(ReciversocketId).emit("message", {
          message: messageSent,
        });
        console.log("ReciversocketId", ReciversocketId);
      });
      res.json(messageSent);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      conversation: conversationId,
    }).exec();
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
};
