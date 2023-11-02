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

    const isConversationExist = await Conversation.findOne({
      participants: { $all: [reciverId, senderId] },
    }).lean();

    if (isConversationExist) {
      console.log("conversationRxist ====>", isConversationExist);

      res.status(201).json(isConversationExist);
    } else {
      const conversation = await new Conversation({
        participants: [reciverId, senderId],
      }).save();
      res.status(201).json(conversation);
    }
  } catch (error) {
    console.log(error);
  }
};
