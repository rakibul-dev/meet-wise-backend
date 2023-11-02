const express = require("express");
const {
  registeUser,
  getUser,
  getPeoples,
} = require("../modules/user/UserController");
const router = express.Router();

router.post("/auth/user/register", registeUser);
router.get("/user", getUser);
router.get("/peoples", getPeoples);

module.exports = router;
