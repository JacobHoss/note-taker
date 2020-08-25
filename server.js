const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3020;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("assets"))

// requiring our routes for API data and HTML files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });