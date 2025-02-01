// Example: Check token expiration
import { jwtDecode } from 'jwt-decode'; // Import the named export

const isAuth = () => {
  // Example: Check token expiration
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired
        localStorage.removeItem("token");
        localStorage.removeItem("type"); // Clear other related data
        // Redirect to login page or show a message
        window.location.href = "/login"; // Example redirect
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("type"); // Clear invalid token data
    }
  }
  // Return a strict boolean value based on the token's presence
  return !!localStorage.getItem("token"); // Convert to boolean
};

export const userType = () => {
  const type = localStorage.getItem("type");
  return type ? type : null; // Return null explicitly if "type" is not set
};

export default isAuth;