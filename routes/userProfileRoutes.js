const express = require("express");
const {
  createUserProfile,
  getUserProfile,
} = require("../controllers/userControllerProfile");

const userProfileRoutes = express.Router();

userProfileRoutes.get("/user-profile", getUserProfile);
userProfileRoutes.post("/user-profile", createUserProfile);

module.exports = {
  userProfileRoutes,
};
