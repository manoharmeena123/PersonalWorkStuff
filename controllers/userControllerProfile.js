const userProfileModel = require("../models/userProfile");

const createUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, image } = req.body;
    const user = req.user.userId.toString();
    console.log("user", user);
    const userProfile = new userProfileModel({
      user,
      firstName,
      lastName,
      image,
    });
    await userProfile.save();
    res
      .status(200)
      .json({
        message: "User profile created successfully",
        status: 200,
        userProfile,
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message, status: 500 });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProfile = await userProfileModel
      .findOne({ user: userId })
      .populate("user");
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    res
      .status(200)
      .json({ message: "User profile found", status: 200, userProfile });
  } catch (error) {
    res.status(500).json({ error: error.message, status: 500 });
  }
};

module.exports = {
  createUserProfile,
  getUserProfile,
};
