import React from "react";
import { Route, Navigate } from "react-router-dom";
import login from "./components/Login";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (login.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
