const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller");

const app = express();

mongoose
  .connect(
    process.env.DB_URI ||
      "mongodb://localhost:27017/Roberto",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// list all the suppliers
app.post("/login", userController.login);
app.post("/signup", userController.signup);
app.get("/profile/:id", userController.getProfile);
app.post("/addRecipe/:id", userController.addRecipe);
app.post("/deleteRecipe/:id", userController.deleteRecipe);
// set port, listen for requests
const app_port = process.env.APP_PORT || 3001;
app.listen(app_port, () => {
  console.log(`Server is running on port ${app_port}.`);
});
