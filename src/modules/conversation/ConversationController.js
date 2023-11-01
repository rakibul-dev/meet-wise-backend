const Conversation = require("./ConversationModel");

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    });
    res.json(conversations);
  } catch (error) {}
};

exports.createConversation = async (req, res) => {
  try {
    const { reciverId, senderId } = req.body;
    const conversation = await new Conversation({
      participants: [reciverId, senderId],
    }).save();
    res.status(201).json(conversation);
  } catch (error) {}
};
