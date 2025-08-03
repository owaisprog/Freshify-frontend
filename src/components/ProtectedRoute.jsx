import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ProtectedRoute = ({ requiredRole, path, children }) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const userData = localStorage.getItem("data"); // Store user data separately (JSON)
  const subscriptionStatus = JSON.parse(
    localStorage.getItem("subscriptionStatus")
  ); // Store user data separately (JSON)
  const user = userData ? JSON.parse(userData) : null; // Parse user data
  // const navigate = useNavigate();
  // If no token, redirect to login

  console.log("Role is :", user?.role, "and Status is: ", subscriptionStatus);
  if (!token) {
    5;
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
  //consoe.log(user?.role === "organization_owner", typeof subscriptionStatus);

  if (user?.role === "organization_owner" && subscriptionStatus === "unpaid") {
    return <Navigate to={"/owner-plans"} replace />;
    // navigate("/owner-plans");
    // ximeca8411@astimei.com
  }

  return children;
};

export default ProtectedRoute;
