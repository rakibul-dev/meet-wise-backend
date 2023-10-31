const express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const {
  SendFriendRequest,
} = require("../modules/friend_request/FriendRequestController");
const router = express.Router();

// router.post("/send-friend-request", SendFriendRequest);
module.exports = router;
