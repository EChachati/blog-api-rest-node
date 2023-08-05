const { validateArticle } = require("../utils/validators");
const Article = require("../models/Article");

// Create controller object with all the used functions
const controller = {
  test: (request, response) => {
    return response.status(200).json({
      message: "This is a test",
    });
  },

  create: (request, response) => {
    // Get the data
    const params = request.body;

    // Validate Data
    try {
      validateArticle(params);
    } catch (error) {
      return response.status(400).json({
        status: error,
        message: "Error validating data: " + error.message,
      });
    }

    // Create object
    const article = new Article(params);

    // Save and return object
    article
      .save()
      .then((savedArticle) => {
        return response.status(201).json({
          status: "success",
          message: "Article created",
          article: savedArticle,
        });
      })
      .catch((error) => {
        return response.status(400).json({
          status: error,
          message: "Error Saving data:" + error,
        });
      });
  },

  list: (request, response) => {
    Article.find()
      .exec()
      .then((articles) => {
        if (articles.length < 1) {
          return response
            .status(404)
            .json({ status: "error", message: "No Articles found" });
        }
        return response.status(200).json({
          status: "success",
          articles: articles,
        });
      })
      .catch((error) => {
        return response.status(404).json({ status: "error", message: error });
      });
  },
};

module.exports = controller;
