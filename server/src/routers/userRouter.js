const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");
const userRouter = express.Router();

//Get /api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

// Delete /api/users
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
