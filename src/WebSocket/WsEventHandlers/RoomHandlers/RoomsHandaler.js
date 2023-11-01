const User = require("../../../Models/User");
const Group = require("../../../Models/Group");
const mongoose = require("mongoose");
const {
  GetSocketSeverInstance,
} = require("../../SocketContainer/SocketContainer");

const JoinUserToeveryRoom = (socket) => {
  const { userId } = socket.user;
  console.log("JoinUserEveryRoom =====>", userId);

  const io = GetSocketSeverInstance();

  //   Group.aggregate([
  //     {
  //       $match: {
  //         members: mongoose.Types.ObjectId(userId),
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$_id",
  //         count: { $sum: { $size: "$members" } },
  //       },
  //     },
  //   ])
  //     .exec()
  //     .then((result) => {
  //       // Handle the result here
  //       //   console.log(result);
  //       result.map((item) => {
  //         console.log(item);
  //         socket.join("649628d29d11ef1346c0130f");
  //       });
  //     })
  //     .catch((error) => {
  //       // Handle the error here
  //       console.error(error);
  //     });

  socket.join("649628d29d11ef1346c0130f");
};

module.exports = {
  JoinUserToeveryRoom,
};
