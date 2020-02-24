const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  req.userId = jwt.verify(token, "secretkey");
  console.log(req.userId);
  next();
};

module.exports = { verifyToken };
