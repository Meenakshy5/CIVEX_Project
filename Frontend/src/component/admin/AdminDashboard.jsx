import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import apiList from "../../lib/apiList";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [recruiters, setRecruiters] = useState([]);
  const adminName = localStorage.getItem("adminName") || "Admin"; // Fetch admin name from localStorage
  const token = localStorage.getItem("token");

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch recruiters from the database
  useEffect(() => {
    if (activeSection === "Manage Recruiters") {
      // console.log('inside manage recruiters',activeSection);
      axios
        .get(apiList.recruiters, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res.data); // Log the actual data
          setRecruiters(res.data);
        })
        .catch((err) => console.error(err));  
    } 
  }, [activeSection, token]);

  // Approve recruiter
  const approveRecruiter = (id) => {
    axios
      .put(apiList.approveRecruiter(id), null, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setRecruiters((prev) =>
          prev.map((rec) => (rec.id === id ? { ...rec, status: "approved" } : rec))
        );
        fetchRecruiters();
      })
      .catch((err) => console.error(err));
  };


  // Delete recruiter
  const deleteRecruiter = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this recruiter?");
    if (isConfirmed) {
      axios
        .delete(apiList.deleteRecruiter(id), { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          // After deletion, refresh the recruiters list
          fetchRecruiters();
        })
        .catch((err) => console.error(err));
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    window.location.reload(); // Refresh the page to redirect to login
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        sx={{ width: 240, flexShrink: 0 }}
        anchor="left"
      >
        <Box
          sx={{
            width: 240,
            padding: 2,
            backgroundColor: "#f4f4f4",
            height: "100%",
          }}
        >
          <Box display="flex" alignItems="center" marginBottom={4}>
            <Avatar sx={{ marginRight: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h6">{adminName}</Typography>
          </Box>
          <List>
            <ListItem button onClick={() => setActiveSection("Dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => setActiveSection("Manage Recruiters")}>
              <ListItemText primary="Manage Recruiters" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box flexGrow={1} padding={3}>
        <IconButton onClick={toggleSidebar} sx={{ marginBottom: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {activeSection}
        </Typography>

        {/* Manage Recruiters Section */}
        {activeSection === "Manage Recruiters" && (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Bio</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Array.isArray(recruiters) && recruiters.length > 0 ? (
              recruiters.map((recruiter) => (
              <TableRow key={recruiter._id}>
              <TableCell>{recruiter.name}</TableCell>
              <TableCell>{recruiter.contactNumber || "N/A"}</TableCell>
              <TableCell>{recruiter.bio || "N/A"}</TableCell>
              <TableCell>{recruiter.status}</TableCell>
              <TableCell>
                {console.log(recruiter)}
            {recruiter.status === "pending" && (
                <Button
                startIcon={<CheckCircleIcon />}
                color="success"
                onClick={() => approveRecruiter(recruiter._id )}
                >
                Approve
                </Button>
            )}
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => deleteRecruiter(recruiter._id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={5}>No recruiters found.</TableCell>
  </TableRow>
)}

              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
