const User = require("../models/userModel");
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
  let { username, password, name } = req.body;
  username = username.toLowerCase();
  let user = await User.findOne({ username });
  console.log(user);
  if (user) return res.status(401).send("Este nombre de usuario ya esxiste");
  const newUser = new User({ username, password, name });

  await newUser.save();
  const token = jwt.sign({ _id: newUser.username }, "secretkey", {
    expiresIn: "1d"
  });

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
  var { username, password } = req.body;
  username = username.toLowerCase();
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send("Este usuario no existe");
  }

  user.comparePassword(password, function(err, isMatch) {
    if (err) throw err;

    if (!isMatch) return res.status(401).send(" Invalid password");

    const token = jwt.sign({ _id: user.username }, "secretkey", {
      expiresIn: "1d"
    });

    res.status(200).json({
      token: token
    });
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
