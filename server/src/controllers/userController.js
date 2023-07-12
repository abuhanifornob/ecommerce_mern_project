const User = require("../models/userModel");
const createError = require("http-errors");
const mongoose = require("mongoose");
const { successResponse } = require("./responseController");
const { findItemById } = require("../services/findItem");
const fs = require("fs");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || " ";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0 };
    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, "Users are not Founds");

    // res.status(200).json({
    //   message: "Users were are return",
    //   users,
    //   pagination: {
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page,
    //     previousPage: page - 1 > 0 ? page - 1 : null,
    //     nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
    //   },
    // });

    return successResponse(res, {
      statusCode: 200,
      message: "Users were are return",
      payloat: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const option = { password: 0 };
    const id = req.params.id;
    // const option = { password: 0 };
    // const user = await User.findById(id, option);
    // if (!user) {
    //   throw createError(404, "User does not exit wiht this id");
    // }

    const user = await findItemById(id, option);
    return successResponse(res, {
      statusCode: 200,
      message: "User were return succefuly",
      payloat: {
        user,
      },
    });
  } catch (error) {
    // Mongose error Hanlde .....
    // if (error instanceof mongoose.Error) {
    //   next(createError(400, "Invalid User Id"));
    //   return;
    // }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findItemById(id, option);

    // ................ Image remove form User Folder ...................
    // const userImagePath = user.image;
    // fs.access(userImagePath, (err) => {
    //   if (err) {
    //     console.error("user image Dosnot Exit");
    //   } else {
    //     fs.unlink(userImagePath, (err) => {
    //       if (err) throw err;
    //       console.log("User Image was Delete");
    //     });
    //   }
    // });

    const deleteUser = await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "User were Delete succefuly",
      payloat: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser };
