import { useNavigate } from "react-router-dom";
import { useState } from "react";
import isAuth, { userType } from "../lib/isAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (location) => {
    console.log(location);
    navigate(location);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "97%", 
        backgroundColor: "#355545",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        fontSize: "18px",
        fontFamily: 'Montserrat, sans-serif',
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000, // Ensures it stays on top
      }}
    >
      {/* Left Side - Logo */}
      <HoverButton text="CIVEX" onClick={() => handleClick("/")} style={{ fontSize: "20px" }} />

      {/* Center - Navigation Links */}
      <div style={{ display: "flex", gap: "20px"}}>
        {isAuth() && userType() !== "admin" && (
          <>
            {userType() === "recruiter" ? (
              <>
                <HoverButton text="All Jobs" onClick={() => handleClick("/home")} />
                <HoverButton text="Add Jobs" onClick={() => handleClick("/addjob")} />
                <HoverButton text="My Jobs" onClick={() => handleClick("/myjobs")} />
                <HoverButton text="Employees" onClick={() => handleClick("/employees")} />
                <HoverButton text="Profile" onClick={() => handleClick("/profile")} />
              </>
            ) : (
              <>
                <HoverButton text="All Jobs" onClick={() => handleClick("/home")} />
                <HoverButton text="Applications" onClick={() => handleClick("/applications")} />
                <HoverButton text="Profile" onClick={() => handleClick("/profile")} />
              </>
            )}
          </>
        )}
        {!isAuth() && (
          <>
            <HoverButton text="About Us" onClick={() => handleClick("/about")} />
            <HoverButton text="Contact Us" onClick={() => handleClick("/contact")} />
          </>
        )}
      </div>

      {/* Right Side - Login / Logout Buttons */}
      <div>
        {isAuth() ? (
          <HoverButton text="Logout" isButton isRed onClick={() => handleClick("/logout")} />
        ) : (
          <>
            <HoverButton text="Login" isButton isRed onClick={() => handleClick("/login")} />
            <HoverButton text="Signup" isButton isRed onClick={() => handleClick("/signup")} />
          </>
        )}
      </div>
    </div>
  );
};

// Reusable Component with Hover Effect
const HoverButton = ({ text, onClick, isButton = false, isRed = false, style }) => {
  const [hover, setHover] = useState(false);

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        fontSize: "16px",
        color: isRed ? (hover ? "white" : "#FF0000") : hover ? "#8B0000" : "white", // White hover for Login/Logout, Dark Red hover for others
        backgroundColor: isButton ? (hover ? "#8B0000" : "transparent") : "transparent",
        padding: isButton ? "8px 16px" : "5px", // Adjusted padding for login/logout
        border: isButton ? "1px solid white" : "none",
        borderRadius: isButton ? "5px" : "0",
        transition: "all 0.3s ease",
        marginLeft: isButton ? "5px" : "0", // Shifted buttons slightly left
        ...style, // Spread the style prop to allow custom styles
      }}
    >
      {text}
    </span>
  );
};

export default Navbar;