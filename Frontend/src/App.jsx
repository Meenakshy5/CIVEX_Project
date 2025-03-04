import { Grid2 } from "@mui/material";
import React, { createContext, useState , useEffect} from "react";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import AdminDashboard from "./component/admin/AdminDashboard";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import About from "./component/Aboutus";
import Contact from "./component/Contactus";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";

const theme = createTheme();

export const SetPopupContext = createContext();

function App() {
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const isAuthenticated = isAuth();
  const isAdmin = userType() === "admin";

  useEffect(() => {
    if (!isAuthenticated) {
          console.log("User is not authenticated.");
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SetPopupContext.Provider value={setPopup}>
          <Grid2 container direction="column">
            <Grid2 item xs>
              <Navbar />
            </Grid2>
            <Grid2
              item
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "98vh",
                paddingTop: "64px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/applications" element={<Applications />} />
                <Route
                  path="/profile"
                  element={
                    userType() === "recruiter" ? <RecruiterProfile /> : <Profile />
                  }
                />
                <Route path="/addjob" element={<CreateJobs />} />
                <Route path="/myjobs" element={<MyJobs />} />
                <Route path="/job/applications/:jobId" element={<JobApplications />} />
                <Route path="/employees" element={<AcceptedApplicants />} />
                
                <Route path="/admin-dashboard" element={<AdminDashboard />}/>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Grid2>
          </Grid2>
          <MessagePopup
            open={popup.open}
            setOpen={(status) =>
              setPopup({
                ...popup,
                open: status,
              })
            }
            severity={popup.severity}
            message={popup.message}
          />
        </SetPopupContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
