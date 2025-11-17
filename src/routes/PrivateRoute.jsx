import React from "react";
import useAuth from "../hooks/useAuth";
import LoaderSpinner from "../components/LoaderSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
//   console.log(location);

  if (loading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
