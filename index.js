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

//The next ones are Middleware
app.use(cors()); // Configure CORS
app.use(express.json()); // Convert body to JSON

// Create Server and listen to HTTP requests
app.listen(port, () => {
  console.log("Server running on Port: " + port);
});
