import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ roles, ...rest }) => {
  const location = useLocation();
  let currentUser = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";
  return currentUser?.roles?.find((role) => roles?.includes(role)) ? (
    <Outlet />
  ) : currentUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
