const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const bcrypt = require('bcrypt');
const UserAuth = require("../db/User");
const JobApplicantInfo = require("../db/JobApplicant");
const RecruiterInfo = require("../db/Recruiter");
const Admin = require('../db/Admin');

const router = express.Router();

router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await UserAuth.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (err) {
    res.status(500).json({ message: 'Error checking email' });
  }
}); 

router.post('/signup', async (req, res) => {
  try {
    const { email, password, type, name, education, skills, resume, profile, bio, contactNumber } = req.body;

    const user = new UserAuth({ email, password, type });
    await user.save();

    const userDetails = type === 'recruiter'
      ? new RecruiterInfo({
          userId: user._id,
          name,
          contactNumber,
          bio,
          status: 'pending'
        })
      : new JobApplicantInfo({
          userId: user._id,
          name,
          education,
          skills,
          resume,
          profile,
        });

    await userDetails.save();

    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    res.json({ token, type });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login route to handle both normal users and admin login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // First, try to find the user as a normal user using Passport local strategy
  passport.authenticate("local", { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }

    // If user is found using Passport (normal user), generate the token
    if (user) {
      const token = jwt.sign({ _id: user._id, userType: user.type }, authKeys.jwtSecretKey);
      return res.json({
        token: token,
        type: user.type,  // Return user type (normal user or other)
      });
    }

    // If the normal user authentication failed, check if it's an admin
    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare password for admin using bcrypt
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token for admin
      const token = jwt.sign({ _id: admin._id, userType: "admin" }, authKeys.jwtSecretKey);

      return res.json({
        token: token,
        type: "admin",  // Return admin type
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  })(req, res, next);
});


module.exports = router;