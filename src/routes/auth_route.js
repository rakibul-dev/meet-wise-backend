const express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../modules/user/UserModel");

const { registeUser } = require("../modules/user/UserController");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const foundUser = await User.findOne({ username }).exec();
    // console.log({ foundUser });

    if (!foundUser) {
      return done(null, false);
    }

    const pasMatched = await bcrypt.compare(password, foundUser.password);
    // console.log({ pasMatched });
    if (pasMatched) {
      return done(null, foundUser);
    }
  })
);

passport.serializeUser((user, done) => {
  //   console.log("serializeUser ==================>", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //   console.log("deserializeUser ==================>", user);
  done(null, user);
});
// passport.deserializeUser((user, next) => {
//   console.log("deserializeUser", user);
//   next(null, user);
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/auth/user",
//     failureRedirect: "/",
//   })
// );

router.post("/user/auth/login", passport.authenticate("local"), (req, res) => {
  // console.log({ user: req.user });

  try {
    res.status(201).json(req.user);
  } catch (error) {}
});

// router.post("/user/register", registeUser);

router.get("/user/logout", (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.json("Logged out");
  });
  req.session.destroy(function (err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "Success" });
    } else {
      // handle error case...
    }
  });
});

module.exports = router;
