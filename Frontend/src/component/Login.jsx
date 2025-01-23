import { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material"; 
import { makeStyles } from "@mui/styles"; 
import axios from "axios";
import { Navigate } from "react-router-dom"; 

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";


const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const [redirectTo, setRedirectTo] = useState(null); // State to handle redirection


  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });

    if (verified) {
      console.log("Login details:", loginDetails); // Log the login details
      axios
        .post(apiList.login, loginDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Login successful", response); // Log response from the API
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
                 
              
      // Check if user is an admin
        if (response.data.type === "admin") {
          setPopup({
            open: true,
            severity: "success",
            message: "Admin logged in successfully",
          });
          console.log("/admin-dashboard");
          setRedirectTo("/admin-dashboard");
        } else {
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          setRedirectTo("/"); 
        }
        setLoggedin(true);
        })
        .catch((err) => {
          console.log("Error during login:", err.response); // Log error response from API
          if (err.response && err.response.status === 401) {
            setPopup({
              open: true,
              severity: "error",
              message: "Invalid email or password",
            });
          } else {
            setPopup({
              open: true,
              severity: "error",
              message: err.response ? err.response.data.message : "Login failed",
            });
          }
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  // Redirect to home if logged in
  if (redirectTo) {
    return <Navigate to={redirectTo} />; // Navigate to either admin dashboard or home
  }

  return (
    <Paper elevation={3} className={classes.body}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}> {/* Use gap instead of spacing */}
        <Box>
          <Typography variant="h3" component="h2">
            Login
          </Typography>
        </Box>
        <Box>
          <EmailInput
            label="Email"
            value={loginDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
          />
        </Box>
        <Box>
          <PasswordInput
            label="Password"
            value={loginDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submitButton}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
