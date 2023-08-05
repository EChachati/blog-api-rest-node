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
app.use(express.json()); // Convert body to JSON

// Routes
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
