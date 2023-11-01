const {
  GetSocketSeverInstance,
} = require("../../WebSocket/SocketContainer/SocketContainer");
const {
  GetAllActiveConnections,
} = require("../../WebSocket/SocketServerStore/SocketServerStore");
const FriendShip = require("./FriendshipModel");

exports.acceptFriendRequest = async (req, res) => {
  try {
  } catch (error) {}
};

exports.SendFriendRequest = async (req, res) => {
  try {
    const io = GetSocketSeverInstance();
    const { requestReciver, requestSender } = req.body;

    // console.log({ requestReciver, requestSender });

    const isAlreadyFriend = await FriendShip.findOne({
      $or: [
        {
          senderId: req.user._id,
          reciverId: requestReciver,
        },
        {
          senderId: requestReciver,
          reciverId: req.user._id,
        },
      ],
    })
      .populate("senderId")
      .exec();

    if (isAlreadyFriend) {
      console.log({ requestReciver });
      const EventRiciverList = GetAllActiveConnections(
        requestReciver.toString()
      );

      EventRiciverList.forEach((ReciversocketId) => {
        io.to(ReciversocketId).emit("friend-request", { isAlreadyFriend });
        console.log("ReciversocketId", ReciversocketId);
      });
      res.status(201).json(isAlreadyFriend);
    } else {
      const requestSent = await new FriendShip({
        senderId: requestSender,
        reciverId: requestReciver,
      }).save();

      const EventRiciverList = GetAllActiveConnections(
        requestReciver.toString()
      );

      EventRiciverList.forEach((ReciversocketId) => {
        io.to(ReciversocketId).emit("friend-request", { requestSent });
        console.log("ReciversocketId", ReciversocketId);
      });
    }

    //   Socket events
  } catch (error) {
    console.log(error);
  }
};

exports.getFriends = async (req, res) => {
  try {
    const { _id } = req.user;
    const friends = await FriendShip.find({
      $or: [
        { senderId: _id, status: "accepted" },
        { reciverId: _id, status: "accepted" },
      ],
    })
      .populate(["senderId", "reciverId"])
      .lean();

    let friendsArr = [];
    const modifiedArray = friends.map((item) => {
      // Check if the senderId or reciverId's _id matches myUserId
      if (item.senderId._id == req.user._id) {
        delete item.senderId;
        console.log("matched as sender");
      } else if (item.reciverId._id == req.user._id) {
        console.log("matched as reciver");
        delete item.reciverId;
      }

      return item;
    });
    modifiedArray.forEach((element) => {
      if (element.senderId) {
        const modifiedObject = {
          ["friend"]: element.senderId,
        };
        friendsArr.push(modifiedObject);
      } else {
        const modifiedObject = {
          ["friend"]: element.reciverId,
        };
        friendsArr.push(modifiedObject);
      }
    });
    console.log({ friendsArr });
    res.json(friendsArr);
  } catch (error) {
    console.log(error);
  }
};
