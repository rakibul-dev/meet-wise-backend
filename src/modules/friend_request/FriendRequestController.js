// const FriendRequest = require("./FriendRequestModel");
// exports.SendFriendRequest = async (req, res) => {
//   try {
//     const { requestReciver, requestSender } = req.body;

//     console.log({ requestReciver, requestSender });
//     const requestSent = await new FriendRequest({
//       senderId: requestSender,
//       reciverId: requestReciver,
//     }).save();
//     res.json(requestSent);
//   } catch (error) {}
// };
