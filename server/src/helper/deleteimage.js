const fs = require("fs").promises;
const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("user Images was Delete");
  } catch (error) {
    console.error("User Images Dos't Exits");
  }
  //   fs.access(userImagePath)
  //     .then(() => fs.unlink(userImagePath))
  //     .then(() => console.log("user Images was Delete"))
  //     .catch((error) => {
  //       console.error("User Images Dos't Exits");
  //     });
};

module.exports = deleteImage;
