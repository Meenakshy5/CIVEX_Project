import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of Redirect

import { SetPopupContext } from "../App";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
    
    // Navigate to the login page after logout
    navigate("/login"); // This will redirect to the login page
  }, [navigate, setPopup]);

  return null; // No need to render anything, the navigation will happen in useEffect
};

export default Logout;
