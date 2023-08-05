const validator = require("validator");

const validateArticle = (params) => {
  if (validator.isEmpty(params.title)) throw new Error("Empty title");
  if (validator.isEmpty(params.content)) throw new Error("Empty content");
};

module.exports = {
  validateArticle,
};
