const { validateArticle, validateImageFile } = require("../utils/validators");
const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const { error } = require("console");

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
    Article.find() // Make a Query add filters here
      .limit(request.params.limit)
      .sort({ date: -1 }) // Sort newer to older
      .exec() // Execute the Query
      .then((articles) => {
        // After the query is done
        if (articles.length < 1) {
          return response
            .status(404)
            .json({ status: "error", message: "No Articles found" });
        }
        return response.status(200).json({
          status: "success",
          url_param: request.params.limit,
          articles: articles,
        });
      })
      .catch((error) => {
        return response.status(404).json({ status: "error", message: error });
      });
  },

  getById: (request, response) => {
    Article.findById(request.params.id)
      .exec()
      .then((article) => {
        return response.status(200).json({
          status: "success",
          article: article,
        });
      })
      .catch((error) => {
        return response.status(404).json({
          status: "error",
          message: "Article Not Found. Error detail: " + error,
        });
      });
  },

  deleteById: (request, response) => {
    const deletedArticle = Article.findOneAndDelete({ _id: request.params.id });

    deletedArticle
      .then((deletedArticle) => {
        if (!deletedArticle) throw new Error("Article Does Not Exist");
        return response.status(200).json({
          status: "success",
          message: "Article deleted successfully!",
          deletedArticle: deletedArticle,
        });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "error",
          message: "Error deleting article. " + error,
        });
      });
  },

  updateById: (request, response) => {
    const articleId = request.params.id;
    const articleData = request.body;

    try {
      validateArticle(articleData);
    } catch (error) {
      return response.status(400).json({
        status: error,
        message: "Error validating data: " + error.message,
      });
    }

    Article.findOneAndUpdate({ _id: articleId }, articleData, { new: true })
      .then((updatedArticle) => {
        return response
          .status(200)
          .json({ status: "success", Article: updatedArticle });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "error",
          message: "Error updating article. " + error,
        });
      });
  },

  loadImage: (request, response) => {
    // validate File
    try {
      validateImageFile(request.file);
    } catch (error) {
      return response.status(400).json({
        status: error,
        message: "Error validating file: " + error.message,
      });
    }

    // update article
    Article.findOneAndUpdate(
      { _id: request.params.id },
      { image: request.file.filename },
      { new: true }
    )
      .then((updatedArticle) => {
        return response
          .status(200)
          .json({ status: "success", Article: updatedArticle });
      })
      .catch((error) => {
        return response.status(400).json({
          status: "error",
          message: "Error updating article. " + error,
        });
      });
  },

  getImage: (request, response) => {
    const filePath = "./images/articles/" + request.params.filename;
    fs.stat(filePath, (error, exists) => {
      if (exists) return response.sendFile(path.resolve(filePath));
      else
        return response.status(404).json({
          status: "error",
          message: "Image " + request.params.filename + " not found.",
        });
    });
  },

  search: (request, response) => {
    const query = request.params.query;

    Article.find({
      $or: [
        // If any of the following conditions are true
        {
          title: { $regex: query, $options: "i" }, // assert title include query
        },
        {
          content: { $regex: query, $options: "i" }, // assert content include query
        },
      ],
    })
      .sort({ date: -1 })
      .exec()
      .then((articles) => {
        if (articles.length <= 0) throw new Error("No Articles Found");
        return response.status(200).json({ status: "success", articles });
      })
      .catch((error) => {
        return response.status(404).json({
          status: "error",
          message: "No Article contains: " + query + ". " + error,
        });
      });
  },
};

module.exports = controller;
