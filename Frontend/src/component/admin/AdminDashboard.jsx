import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if the token is not present
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }, []);
console.log('setIsLoggedin',setIsLoggedin);

  // if (!isLoggedin) {
  //   return <Navigate to="/login" />;
  // }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setIsLoggedin(false);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h6">Welcome to the Admin Dashboard</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={() => alert("Manage Users/Recruiters")}
          >
            Manage Users/Recruiters
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
            onClick={() => alert("Approve/Reject Recruiters")}
          >
            Approve Recruiters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminDashboard;
