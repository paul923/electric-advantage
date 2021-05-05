import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ForbiddenPage } from "../pages";

const ProtectedRoute = ({ auth, component: Component, ...parentProps }) => {
  return (
    <Route
      {...parentProps}
      render={(props) => {
        return auth === true ? <Component {...props} /> : <ForbiddenPage />;
      }}
    />
  );
};

export default ProtectedRoute;
