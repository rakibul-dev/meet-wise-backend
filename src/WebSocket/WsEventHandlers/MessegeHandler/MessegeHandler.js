const Messege = require("../../../Models/Messege");
const User = require("../../../Models/User");

const {
  GetSocketSeverInstance,
} = require("../../SocketContainer/SocketContainer");
const {
  GetAllActiveConnections,
} = require("../../SocketServerStore/SocketServerStore");

const SendRealtimeMessege = async (messege) => {
  console.log("from realtime messege====>", messege);

  const EventRiciverList = GetAllActiveConnections(
    messege.reciver._id.toString()
  );

  const io = GetSocketSeverInstance();

  //   const pureObject = JSON.parse(messege)

  EventRiciverList.forEach((ReciversocketId) => {
    io.to(ReciversocketId).emit("incomming-messege", messege);
    // io.to("6496299e57db3fbdc12a5c7d").emit("incomming-messege", messege);
  });
  console.log(EventRiciverList);
};

const SendGroupMessage = async (messege) => {
  const io = GetSocketSeverInstance();
  io.to("649628d29d11ef1346c0130f").emit("newMessage", {
    content: "i am group message",
  });
};

module.exports = { SendRealtimeMessege, SendGroupMessage };
