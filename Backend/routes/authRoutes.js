const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const bcrypt = require('bcrypt');
const User = require("../db/User");
const JobApplicant = require("../db/JobApplicant");
const Recruiter = require("../db/Recruiter");
const Admin = require('../db/Admin');

const router = express.Router();

router.post("/signup", (req, res) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "recruiter"
          ? new Recruiter({
              userId: user._id,
              name: data.name,
              contactNumber: data.contactNumber,
              bio: data.bio,
              status:data.status,
            })
          : new JobApplicant({
              userId: user._id,
              name: data.name,
              education: data.education,
              skills: data.skills,
              rating: data.rating,
              resume: data.resume,
              profile: data.profile,
            });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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