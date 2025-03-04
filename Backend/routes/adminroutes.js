const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../lib/jwtAuth");

const RecruiterInfo = require("../db/Recruiter");

const router = express.Router();

router.get("/dashboard/stats", async (req, res) => {
  try {
    const totalUsers = await mongoose.model("UserAuth").countDocuments(); // Replace "User" with your user model
    const totalApplicants = await mongoose.model("JobApplicantInfo").countDocuments(); // Replace "Applicant" with your applicant model
    const totalRecruiters = await mongoose.model("RecruiterInfo").countDocuments(); // Replace "RecruiterInfo" if the model name differs
    const totalJobs = await mongoose.model("jobs").countDocuments(); // Replace "Job" with your job model

    res.json({
      totalUsers,
      totalApplicants,
      totalRecruiters,
      totalJobs,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});


// This endpoint fetches all recruiter information from the RecruiterInfo collection.
router.get("/recruiterinfos", async (req, res) => {
  console.log("inside router");
  try {
    console.log("inside try");
    const recruiters = await RecruiterInfo.find();
    console.log(recruiters);
    
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recruiters" });
  }
});

// This endpoint updates the status of a recruiter to "approved".
router.put("/recruiterinfos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recruiter = await RecruiterInfo.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: "Failed to update recruiter status" });
  }
});

// This endpoint deletes a recruiter from the database based on their id.

router.delete("/recruiterinfos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recruiter = await RecruiterInfo.findByIdAndDelete(id);
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }
    res.json({ message: "Recruiter deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete recruiter" });
  }
});

module.exports = router;
