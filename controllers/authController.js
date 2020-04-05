const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).json({message:"Null token"});
  }
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else{
      req.username = decoded._id;
      next();
    }
  });

};

const verifyUser = async (req, res, next) => {
  let username = req.username;
  console.log(username);
  let user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid user in token" });
  next();
};
module.exports = { verifyToken, verifyUser };
