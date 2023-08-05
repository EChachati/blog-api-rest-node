// Imports
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// innit app
console.log("Running App");

// connect to DB
connection();

// Create server Node
const app = express();
const port = 3900;

// The next ones are Middleware
app.use(cors()); // Configure CORS

// Convert body to JSON
app.use(express.json()); // Receive data with content-type app/json
app.use(express.urlencoded({ extended: true })); // Receive data with other content-types

// Routes
// Import Routers
const articleRoutes = require("./router/article");

// Add Router
app.use("/api/article", articleRoutes);

// Test Endpoint
app.get("/", (request, response) => {
  console.log("Called Endpoint test :3");
  return response.status(200).json({
    status: 200,
    message: "Hello World from NodeJS",
  });
});

// Create Server and listen to HTTP requests
app.listen(port, () => {
  console.log("Server running on Port: " + port);
});
