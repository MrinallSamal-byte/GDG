import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    // User is not admin but route requires admin
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
