// Imports
const express = require("express");
const ArticleController = require("../controllers/article");

// Create router object
const router = express.Router();

// Routes
router.get("/test", ArticleController.test);
router.post("/create", ArticleController.create);
router.get("/list/:limit?", ArticleController.list);
router.get("/get/:id", ArticleController.getById);
router.delete("/delete/:id", ArticleController.deleteById);
router.put("/update/:id", ArticleController.updateById);

// Export Router
module.exports = router;
