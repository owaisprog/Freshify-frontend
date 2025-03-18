import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ requiredRole, path, children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const userData = localStorage.getItem("data"); // Store user data separately (JSON)
  const user = userData ? JSON.parse(userData) : null; // Parse user data
  console.log(user, "😊😊");
  // If no token, redirect to login
  if (!token) {
    return <Navigate to={path} replace />;
  }
  // "/OrganizationOwnerLogin"
  // If role does not match, show Unauthorized error
  if (user && user.role !== requiredRole) {
    throw new Error(
      "Unauthorized: You do not have permission to access this page."
    );
  }

  return children;
};

export default ProtectedRoute;
