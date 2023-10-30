const express = require("express");
const {
  acceptFriendRequest,
  SendFriendRequest,
  getFriends,
} = require("../modules/friendship/FriendshipController");

const router = express.Router();
router.post("/send-friend-request", SendFriendRequest);
router.post("/accept-friend-request", acceptFriendRequest);
router.get("/get-friends", getFriends);
module.exports = router;
