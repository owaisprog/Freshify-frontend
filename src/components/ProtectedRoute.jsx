import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ProtectedRoute = ({ requiredRole, path, children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const userData = localStorage.getItem("data"); // Store user data separately (JSON)
  const user = userData ? JSON.parse(userData) : null; // Parse user data
  // If no token, redirect to login
  if (!token) {
    return <Navigate to={path} replace />;
  }
  // "/OrganizationOwnerLogin"
  // If role does not match, show Unauthorized error
  if (user && user?.role !== requiredRole) {
    return (
      <ErrorPage
        errorCode="403"
        title="Unauthorized Access"
        message="You don't have permission to view this page"
      />
    );
  }

  return children;
};

export default ProtectedRoute;
