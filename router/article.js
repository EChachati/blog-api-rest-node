// Imports
const express = require("express");
const ArticleController = require("../controllers/article");
const multer = require("multer");

// Create router object
const router = express.Router();

// Create Storage
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "./images/articles/");
  },
  filename: (request, file, cb) => {
    cb(null, "article_" + Date.now() + file.originalname);
  },
});

// Middleware
const uploads = multer({ storage: storage });

// Routes
router.get("/test", ArticleController.test);
router.post("/create", ArticleController.create);
router.get("/list/:limit?", ArticleController.list);
router.get("/get/:id", ArticleController.getById);
router.delete("/delete/:id", ArticleController.deleteById);
router.put("/update/:id", ArticleController.updateById);
router.post(
  "/load-image/:id",
  [uploads.single("file")],
  ArticleController.loadImage
);
router.get("/image/:filename", ArticleController.getImage);

// Export Router
module.exports = router;
