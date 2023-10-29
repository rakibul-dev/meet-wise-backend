const bcrypt = require("bcrypt");
const User = require("./UserModel");

const registeUser = async (req, res) => {
  const { userName, password, email, role } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userCreated = await new User({
      username: userName,
      password: hashedPassword,
      email,
      role,
    }).save();
    res.status(201).json(userCreated);
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
};

const getUsers = async (req, res) => {
  try {
    // console.log(req.query);
    const role = req.query?.role || "customer";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const totalCount = await User.countDocuments({ role });
    console.log(req.parmas.role);
    const totalPages = Math.ceil(totalCount / perPage);
    const users = await User.find({ role })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(201).json({
      users,
      pagination: {
        page,
        per_page: perPage,
        total_items: totalCount,
        total_pages: totalPages,
      },
    });
  } catch (error) {
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

const getCustomers = async (req, res) => {
  try {
    // console.log(req.query);
    const role = req.query?.role || "customer";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10;
    const totalCount = await User.countDocuments({ role });

    const totalPages = Math.ceil(totalCount / perPage);
    const users = await User.find({ role })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(201).json({
      users,
      pagination: {
        page,
        per_page: perPage,
        total_items: totalCount,
        total_pages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  //   try {
  const user = await User.findOne({ _id }).exec();
  res.json(user);
  //   } catch (error) {}
};

module.exports = {
  registeUser,
  getUsers,
  getUserbyId,
  getCustomers,
  getUser,
};
