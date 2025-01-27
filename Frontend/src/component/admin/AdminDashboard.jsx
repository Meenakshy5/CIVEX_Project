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
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import apiList from "../../lib/apiList";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [recruiters, setRecruiters] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalApplicants: 0,
    totalRecruiters: 0,
    totalJobs: 0,
  });
  const adminName = localStorage.getItem("adminName") || "Admin";
  const token = localStorage.getItem("token");

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch dashboard stats
  useEffect(() => {
    if (activeSection === "Dashboard") {
      axios
        .get(apiList.dashboardStats, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setDashboardStats(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeSection, token]);

  // Fetch recruiters from the database
  useEffect(() => {
    if (activeSection === "Manage Recruiters") {
      axios
        .get(apiList.recruiters, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setRecruiters(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeSection, token]);

  // Approve recruiter
  const approveRecruiter = (id) => {
    axios
      .put(apiList.approveRecruiter(id), null, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setRecruiters((prev) =>
          prev.map((rec) => (rec._id === id ? { ...rec, status: "approved" } : rec))
        );
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
          setRecruiters((prev) => prev.filter((rec) => rec._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    window.location.reload();
  };

  // Chart data
  const barChartData = {
    labels: ["Total Users", "Applicants", "Recruiters", "Jobs"],
    datasets: [
      {
        label: "Statistics",
        data: [
          dashboardStats.totalUsers,
          dashboardStats.totalApplicants,
          dashboardStats.totalRecruiters,
          dashboardStats.totalJobs,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Users", "Applicants", "Recruiters", "Jobs"],
    datasets: [
      {
        data: [
          dashboardStats.totalUsers,
          dashboardStats.totalApplicants,
          dashboardStats.totalRecruiters,
          dashboardStats.totalJobs,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
      },
    ],
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: 2,
            backgroundColor: "#f4f4f4",
            height: "100%",
            overflowY: "auto",
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
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box flexGrow={1} padding={3} marginLeft={isSidebarOpen ? 0 : 0}>
        <IconButton onClick={toggleSidebar} sx={{ marginBottom: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {activeSection}
        </Typography>

        {/* Dashboard Section */}
        {activeSection === "Dashboard" && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: 150,
                  }}
                >
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h4">{dashboardStats.totalUsers}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "#2196f3",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: 150,
                  }}
                >
                  <Typography variant="h6">Total Applicants</Typography>
                  <Typography variant="h4">{dashboardStats.totalApplicants}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: 150,
                  }}
                >
                  <Typography variant="h6">Total Recruiters</Typography>
                  <Typography variant="h4">{dashboardStats.totalRecruiters}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "#f44336",
                    color: "#fff",
                    textAlign: "center",
                    minHeight: 150,
                  }}
                >
                  <Typography variant="h6">Total Jobs</Typography>
                  <Typography variant="h4">{dashboardStats.totalJobs}</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={3} marginTop={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 ,height: "70%"}}>
                  <Typography variant="h6" gutterBottom>
                    Bar Chart
                  </Typography>
                  <Bar data={barChartData}  options={{ responsive: true, maintainAspectRatio: true }} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Pie Chart
                  </Typography>
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

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
                        {recruiter.status === "pending" && (
                          <Button
                            startIcon={<CheckCircleIcon />}
                            color="success"
                            onClick={() => approveRecruiter(recruiter._id)}
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
