import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useFeathers } from "figbird";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const app = useFeathers();
  const location = useLocation();
  let currentUser = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
