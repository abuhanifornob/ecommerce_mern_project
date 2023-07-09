const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const userRouter = express.Router();

//Get /api/users
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

// Delete /api/users
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
