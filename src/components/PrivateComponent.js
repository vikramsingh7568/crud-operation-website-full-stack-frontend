import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  // if user is not logged in then we are redirecting user to home page for signup
  return auth ? <Outlet /> : <Navigate to="signup" />;
};

export default PrivateComponent;
