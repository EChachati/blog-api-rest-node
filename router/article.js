// Imports
const express = require("express");
const ArticleController = require("../controllers/article");

// Create router object
const router = express.Router();

// Routes
router.get("/test", ArticleController.test);
router.post("/create", ArticleController.create);
router.get("/list", ArticleController.list);

// Export Router
module.exports = router;
