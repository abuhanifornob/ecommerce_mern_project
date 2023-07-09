require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 5001;
const mongodbURL = process.env.DATA_BASE_URL;
const userDefaultImagePath =
  process.env.USER_DEFAULT_PATH || "/puplic/images/users/defaultUser.jpg";

module.exports = { serverPort, mongodbURL, userDefaultImagePath };
