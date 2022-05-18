import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFeathers } from "figbird";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const app = useFeathers();
  let currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : "";
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Navigate to="/login" state={{ from: props.location }} />;
          }

          // check if route is restricted by role
          if (currentUser.role && currentUser.role.indexOf(roles) === -1) {
            // role not authorised so redirect to home page
            localStorage.setItem("currentUser", null);
            app.logout();
            return <Navigate to="/login" />;
          }

          // authorised so return component
          return <Component {...props} />;
        }}
      />
    </Routes>
  );
};
