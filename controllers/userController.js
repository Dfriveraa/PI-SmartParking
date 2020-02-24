const User = require("./../models/usersModel");
const jwt = require("jsonwebtoken");
const getAllUsers = (req, res) => {
  res.json({
    status: "Not found",
    message: "try again more later"
  });
};
const getUserById = (req, res) => {
  res.json({
    status: "Not found",
    message: "try again more later"
  });
};
const createUser = async (req, res) => {
  const { institutional_user, password, name } = req.body;
  const newUser = new User({ institutional_user, password, name });
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "secretkey");
  res.status(200).json({
    token: token
  });
};
const deleteUser = (req, res) => {
  res.json({
    status: "Not found",
    message: "try again more later"
  });
};
const updateUser = (req, res) => {
  res.json({
    status: "Not found",
    message: "try again more later"
  });
};
const loginUser = async (req, res) => {
  const { institutional_user, password } = req.body;
  const user = await User.findOne({ institutional_user });
  if (!user) {
    return res.status(401).send("this email dos not exist");
  }
  if (user.password !== password) {
    return res.status(401).send("Invalid password");
  }
  const token = jwt.sign({ _id: user.id }, "secretkey");
  res.status(200).json({
    token: token
  });
};
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  loginUser
};
