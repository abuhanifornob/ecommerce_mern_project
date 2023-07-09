const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { Timestamp } = require("mongodb");
const userDefaultImagePath = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
      maxLength: [31, "User Name will be  Maximum 31 Charecter"],
      minLength: [3, "User Name will be  Minimum 3 Charecter"],
    },
    email: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please Enter the valid Email id",
      },
    },
    password: {
      type: String,
      require: [true, "Password is Required"],
      trim: true,
      minLength: [6, "The user Password Minimum 6 charecter"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      userDefaultImagePath,
    },
    address: {
      type: String,
      require: [true, "Address is Required"],
    },
    phone: {
      type: String,
      require: [true, "User Phone Number is Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);
module.exports = User;
