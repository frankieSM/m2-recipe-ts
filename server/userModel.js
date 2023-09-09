const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  recipes: [
    {
      id: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  ],
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
