const bcrypt = require("bcrypt");
const User = require("./UserModel");
const FriendShip = require("../friendship/FriendshipModel.js");

const { ObjectId } = require("mongoose");

const registeUser = async (req, res) => {
  const { userName, password, email, role } = req.body;
  const saltRounds = 10;

  try {
    const foundUser = await User.findOne({ email }).exec();

    if (foundUser) {
      res.status(201).json(foundUser);
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userCreated = await new User({
        username: userName,
        password: hashedPassword,
        email,
        role,
      }).save();
      res.status(201).json(userCreated);
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const getPeoples = async (req, res) => {
  try {
    // console.log(req.query);
    // const role = req.query?.role || "customer";
    // const page = parseInt(req.query.page) || 1;
    // const perPage = parseInt(req.query.per_page) || 10;
    // const totalCount = await User.countDocuments({ role });
    // console.log(req.parmas.role);
    // const totalPages = Math.ceil(totalCount / perPage);

    const { _id } = req.user;
    const friends = await FriendShip.find({
      $or: [
        { senderId: _id, status: "accepted" },
        { reciverId: _id, status: "accepted" },
      ],
    }).lean();

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
        friendsArr.push(element.senderId);
      } else {
        const modifiedObject = {
          ["friend"]: element.reciverId,
        };
        friendsArr.push(element.reciverId);
      }
    });
    console.log({ friendsArr });
    friendsArr.push(req.user._id);

    const users = await User.find({
      _id: { $nin: friendsArr },
    });

    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const getUserbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const getUser = async (req, res) => {
  try {
    console.log(req.user);
    const { _id } = req.user;
    const user = await User.findOne({ _id }).exec();
    res.json(user);
  } catch (error) {}
};

module.exports = {
  registeUser,
  getPeoples,
  getUserbyId,
  getUser,
};
