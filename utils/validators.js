const validator = require("validator");
const fs = require("fs");

const validateArticle = (params) => {
  if (validator.isEmpty(params.title)) throw new Error("Empty title");
  if (validator.isEmpty(params.content)) throw new Error("Empty content");
};

const validateImageFile = (file) => {
  if (!file) throw new Error("No File Found");
  const extension = file.filename.split(".")[1];
  if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
    fs.unlink(file.path);
    throw new Error("Invalid extension");
  }
};

module.exports = {
  validateArticle,
  validateImageFile,
};
