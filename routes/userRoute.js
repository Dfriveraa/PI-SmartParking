const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.get("/", authController.verifyToken, userController.getAllUsers);

router.get("/:id", authController.verifyToken, userController.getUserById);

router.patch("/:id", authController.verifyToken, userController.updateUser);

router.delete(":id", authController.verifyToken, userController.deleteUser);

router.post("/", userController.createUser);

router.post("/login", userController.loginUser);

module.exports = router;
