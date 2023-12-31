const mongoose = require("mongoose");
const User = require("../models/userModel");
const createError = require("http-errors");

const findWithId = async (Model, id, option = {}) => {
  try {
    const item = await User.findById(id, option);
    if (!item) {
      throw createError(
        Model,
        ` ${Model.modelName} does not exit wiht this id`
      );
    }
    return item;
  } catch (error) {
    // Mongoose error find
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid Item Id");
    }
    throw error;
  }
};

module.exports = { findWithId };
