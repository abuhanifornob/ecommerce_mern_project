const User = require("../models/userModel");
const createError = require("http-errors");
const mongoose = require("mongoose");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const fs = require("fs");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || " "; // this is Sercing parameter
    const page = Number(req.query.page) || 1; //  page number for pagination section
    const limit = Number(req.query.limit) || 5; // limit is how much number of users amara detece chaiteece

    const searchRegExp = new RegExp(".*" + search + ".*", "i"); // ar maddomoe prothome and last a kono kisu thaleo segila ignore korbe and ata case insencetive

    const filter = {
      isAdmin: { $ne: true }, // ar maddome amara je user admin na tader k select korbe
      // or operation ar maddome amra 3 field ar upor operetion chalete parbo
      // name,email, phone je kono akter sathe match korlai pabo
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0 }; // password retrun korbe na

    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments(); //  total match kora users ar number
    if (!users) throw createError(404, "Users are not Founds"); // jodi kono match na kore then ai message show korbe

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
    const user = await findWithId(id, option);

    if (!user) {
      throw createError(404, " Dos't exit with this id");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User were return succefuly",
      payloat: {
        user,
      },
    });
  } catch (error) {
    // Mongose error Hanlde .....
    if (error instanceof mongoose.Error) {
      next(createError(400, "Invalid User Id"));
      return;
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findWithId(id, option);

    // ................ Image remove form User Folder ...................
    const userImagePath = user.image;
    fs.access(userImagePath, (err) => {
      if (err) {
        console.error("user image Dosnot Exit");
      } else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log("User Image was Delete");
        });
      }
    });

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });
    return successResponse(res, {
      statusCode: 200,
      message: "User were Delete succefuly",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUser, deleteUser };
