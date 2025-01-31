import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material"; // Removed extra space
import { useNavigate } from "react-router-dom"; // Updated useHistory to useNavigate
import { styled } from '@mui/system'; // Import styled for MUI v5

import isAuth, { userType } from "../lib/isAuth";

// Define styled components instead of using makeStyles
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: "space-between", // Adjust layout of Toolbar elements
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2), // Apply spacing for buttons
}));

const Navbar = () => {
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  console.log("isAuth():", isAuth());
  console.log("userType():", userType());

  const handleClick = (location) => {
    console.log(location);
    navigate(location); // Use navigate instead of history.push
  };

  return (
    <AppBar position="fixed"sx={{ backgroundColor: '#355545' }}>
      <StyledToolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CIVEX
        </Typography>
        {isAuth() ? (
          userType() === "admin" ? (
            // Show only the Logout button for admin users
            <StyledButton color="inherit" onClick={() => handleClick("/logout")}>
              Logout
            </StyledButton>
          ) :userType() === "recruiter" ? (
            <>
              <StyledButton color="inherit" onClick={() => handleClick("/home")}>
                ALL JOBS
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/addjob")}>
                Add Jobs
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/myjobs")}>
                My Jobs
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/employees")}>
                Employees
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </StyledButton>
            </>
          ) : (
            <>
              <StyledButton color="inherit" onClick={() => handleClick("/home")}>
              ALL JOBS
              </StyledButton>
              <StyledButton
                color="inherit"
                onClick={() => handleClick("/applications")}
              >
                Applications
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/profile")}>
                Profile
              </StyledButton>
              <StyledButton color="inherit" onClick={() => handleClick("/logout")}>
                Logout
              </StyledButton>
            </>
          )
        ) : (
          <>
            <StyledButton color="inherit" onClick={() => handleClick("/login")}>
              Login
            </StyledButton>
            <StyledButton color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </StyledButton>
          </>
        )}
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
