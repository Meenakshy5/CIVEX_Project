import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Box,  // Import Box for layout
} from "@mui/material"; // Adjust imports for Material-UI v5
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For react-router-dom v6
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import FileUploadInput from "../lib/FileUploadInput";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const Login = () => {
  const navigate = useNavigate();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());
  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],  // Added skills to state
    resume: "",
    profile: "",
    bio: "",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState([
    { institutionName: "", startYear: "", endYear: "" },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: { required: true, error: false, message: "" },
    password: { required: true, error: false, message: "" },
    name: { required: true, error: false, message: "" },
  });

  const handleInput = (key, value) => {
    setSignupDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler((prev) => ({
      ...prev,
      [key]: { required: true, error: status, message },
    }));
  };

  useEffect(() => {
    setSignupDetails((prev) => ({
      ...prev,
      education: education.filter(
        (edu) => edu.institutionName.trim() !== "" // Avoid empty institutions
      ),
    }));
  }, [education]);

  const validateInputs = () => {
    const updatedErrorHandler = { ...inputErrorHandler };
    let isValid = true;

    Object.keys(inputErrorHandler).forEach((key) => {
      if (!signupDetails[key]) {
        updatedErrorHandler[key] = {
          required: true,
          error: true,
          message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        };
        isValid = false;
      }
    });

    setInputErrorHandler(updatedErrorHandler);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      setPopup({
        open: true,
        severity: "error",
        message: "Please fill all required fields",
      });
      return;
    }

    const details = {
      ...signupDetails,
      contactNumber: phone ? `+${phone}` : "",
    };
    console.log("Sending request with data:", details);

    axios
      .post(apiList.signup, details)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("type", response.data.type);
        setLoggedin(isAuth());
        setPopup({
          open: true,
          severity: "success",
          message: "Signup successful!",
        });
        navigate("/");
      })
      .catch((err) => {
      // Check if the error is because the email already exists
      if (err.response && err.response.data.message === "Email already exists") {
        setPopup({
          open: true,
          severity: "error",
          message: "This email is already registered. Please choose a different one.",
        });
      } else {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message || "Signup failed",
        });
      }
    });
  };

  if (loggedin) {
    return null; // Prevent rendering signup form when logged in
  }

  return (
    <Paper elevation={3} style={{ padding: "40px" }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Box>
          <Typography variant="h4">Signup</Typography>
        </Box>
        <Box>
          <TextField
            select
            label="Category"
            value={signupDetails.type}
            onChange={(e) => handleInput("type", e.target.value)}
            fullWidth
          >
            <MenuItem value="applicant">Applicant</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField
            label="Name"
            value={signupDetails.name}
            onChange={(e) => handleInput("name", e.target.value)}
            fullWidth
            error={inputErrorHandler.name.error}
            helperText={inputErrorHandler.name.message}
          />
        </Box>
        <Box>
          <EmailInput
            value={signupDetails.email}
            onChange={(e) => handleInput("email", e.target.value)}
            error={inputErrorHandler.email.error}
            helperText={inputErrorHandler.email.message}
          />
        </Box>
        <Box>
          <PasswordInput
            value={signupDetails.password}
            onChange={(e) => handleInput("password", e.target.value)}
            error={inputErrorHandler.password.error}
            helperText={inputErrorHandler.password.message}
          />
        </Box>
        {signupDetails.type === "applicant" && (
          <>
            {/* Multifield Input */}
            {education.map((edu, idx) => (
              <Box display="flex" gap={2} key={idx}>
                <Box flex={1}>
                  <TextField
                    label={`Experience#${idx + 1}`}
                    value={edu.institutionName}
                    onChange={(e) =>
                      setEducation((prev) => {
                        const updated = [...prev];
                        updated[idx].institutionName = e.target.value;
                        return updated;
                      })
                    }
                  />
                </Box>
                <Box flex={0.5}>
                  <TextField
                    label="Start Year"
                    type="number"
                    value={edu.startYear}
                    onChange={(e) =>
                      setEducation((prev) => {
                        const updated = [...prev];
                        updated[idx].startYear = e.target.value;
                        return updated;
                      })
                    }
                  />
                </Box>
                <Box flex={0.5}>
                  <TextField
                    label="End Year"
                    type="number"
                    value={edu.endYear}
                    onChange={(e) =>
                      setEducation((prev) => {
                        const updated = [...prev];
                        updated[idx].endYear = e.target.value;
                        return updated;
                      })
                    }
                  />
                </Box>
              </Box>
            ))}
            <Button
              onClick={() =>
                setEducation((prev) => [
                  ...prev,
                  { institutionName: "", startYear: "", endYear: "" },
                ])
              }
            >
              Add experience
            </Button>
            <Box>
            <TextField
              label="Skills"
              value={signupDetails.skills.join(', ')} // Join skills with comma separation
              onChange={(e) => {
                const newSkills = e.target.value.split(',').map((skill) => skill.trim()); // Split input by commas
                handleInput("skills", newSkills); // Update the skills in signupDetails
              }}
              helperText="Enter skills separated by commas (Press Enter after each skill)"
              fullWidth
            />
          </Box>

            <Box>
              <FileUploadInput
                label="Resume (.pdf)"
                uploadTo={apiList.uploadResume}
                handleInput={handleInput}
                identifier={"resume"}
              />
            </Box>
            <Box>
              <FileUploadInput
                label="Profile Photo (.jpg/.png)"
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Box>
          </>
        )}
        {signupDetails.type === "recruiter" && (
          <>
            <TextField
              label="Bio"
              multiline
              rows={4}
              value={signupDetails.bio}
              onChange={(e) => handleInput("bio", e.target.value)}
            />
            <PhoneInput
              country="in"
              value={phone}
              onChange={(value) => setPhone(value)}
            />
          </>
        )}
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Signup
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
