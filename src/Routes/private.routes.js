import React from "react";

import { Redirect, Route, useLocation } from "react-router-dom";

export default function PrivateRoutes(props) {
  const location = useLocation();

  return window.localStorage.getItem("token") ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/PallasFront/login",
        state: { from: location },
      }}
    />
  );
}
