const isAuth = () => {
  // Return a strict boolean value based on the token's presence
  return !!localStorage.getItem("token");
};

export const userType = () => {
  const type = localStorage.getItem("type");
  return type ? type : null; // Return null explicitly if "type" is not set
};

export default isAuth;
