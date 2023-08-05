// Imports
const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true, default: "default.png" },
});

// This allows us to import in other files
module.exports = model("Article", ArticleSchema, "articles");
//Parameters Name for import, Schema Used, MongoDB collection associated
