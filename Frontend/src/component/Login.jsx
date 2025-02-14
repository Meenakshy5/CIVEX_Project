import { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container
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
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://images.pexels.com/photos/434337/pexels-photo-434337.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginCard: {
    padding: "40px",
    width: "350px",
    backgroundColor: "rgba(0, 70, 50, 0.9)", // Dark green with transparency
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
  inputField: {
    width: "350px", // Ensure full width within the card
    marginBottom: "20px", // Consistent margin bottom
    "& input": {
      color: "#fff",
    },
    "& label": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bbb",
      },
      "&:hover fieldset": {
        borderColor: "#fff",
      },
    },
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#004632",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  linkText: {
    color: "#bbb",
    marginTop: "10px",
    "& a": {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "bold",
    },
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
    email: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const [redirectTo, setRedirectTo] = useState(null); // State to handle redirection

  const handleInput = (key, value) => {
    setLoginDetails({ ...loginDetails, [key]: value });
  };

  const handleLogin = () => {
    axios
      .post(apiList.login, loginDetails, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("type", response.data.type);

        if (response.data.type === "admin") {
          setPopup({ open: true, severity: "success", message: "Admin logged in" });
          setRedirectTo("/admin-dashboard");
        } else {
          setPopup({ open: true, severity: "success", message: "Logged in successfully" });
          setRedirectTo("/");
        }
        setLoggedin(true);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response ? err.response.data.message : "Login failed",
        });
      });
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.loginCard}>
        <Typography variant="h4" component="h1" style={{ color: "white", marginBottom: "20px" }}>
          Login
        </Typography>
        <EmailInput 
          label="E-mail Address"
          value={loginDetails.email}
          onChange={(event) => handleInput("email", event.target.value)}
          className={classes.inputField}
        />
        <PasswordInput
          label="Password"
          value={loginDetails.password}
          onChange={(event) => handleInput("password", event.target.value)}
          className={classes.inputField}
        />
        <Button className={classes.submitButton} onClick={handleLogin}>
          LOGIN
        </Button>
        <Typography className={classes.linkText}>
          Don't have an account? <a href="/signup">Sign up</a>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;