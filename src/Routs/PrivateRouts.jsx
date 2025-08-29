import React from "react";
import { Navigate } from "react-router";
import useAuth from "../CustomHooks/useAuth";

const PrivateRouts = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-lime-600"></div>
    );
  }

  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/Register"></Navigate>
    );
  }

  return children;
};

export default PrivateRouts;
