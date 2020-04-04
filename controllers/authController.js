const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  jwt.verify(token, "secretkey",(err,decoded)=>{
    if (err) {
      return res.json({ message: 'Invalid token' });
    } else {
      req.username = decoded.username;
      next();
    }
  });
  next();
};

const verifyUser=async (req,res,next)=>{
  let username=req.username;
  let user=await User.findOne({username});
  if (!user) return res.status(401).json({message:'Invalid user in token'})
};
module.exports = { verifyToken,verifyUser };
