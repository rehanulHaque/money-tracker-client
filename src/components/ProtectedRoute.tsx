import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
