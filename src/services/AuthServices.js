import { toast } from "react-toastify";
import { apiGet, apiPost } from "./useApi";

export const loginUser = async (email, password, role) => {
  try {
    const data = await apiPost("/api/login", { email, password });
    if (data && data.user.role !== role) {
      toast.error(
        "Unauthorized: You do not have permission to access this page.",
        {
          position: "top-right",
        }
      );
      throw new Error(
        "Unauthorized: You do not have permission to access this page."
      );
    }
    // ✅ Store the token after login
    localStorage.setItem("token", data.token);
    localStorage.setItem("data", JSON.stringify(data.user));
    localStorage.setItem(
      "subscriptionStatus",
      JSON.stringify(data?.subscriptionStatus)
    );

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await apiPost("/api/register", userData);
    // // //consoe.log(data);
    // if (data && data.user.role !== role) {
    //   throw new Error(
    //     "Unauthorized: You do not have permission to access this page."
    //   );
    // }
    // ✅ Store the token after login
    localStorage.setItem("token", JSON.stringify(data.user.token));
    localStorage.setItem("data", JSON.stringify(data.newUser));
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    return await apiGet("/api/me");
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  window.location.reload(); // Reload page to clear all user data
};

// utils/handleSessionExpiry.js
export const handleSessionExpiry = () => {
  const data = JSON.parse(localStorage.getItem("data"));

  if (data?.role === "admin") {
    window.location.href = "/OrganizationOwnerUserLogin"; // Redirect to login page
  } else if (data?.role === "barber") {
    window.location.href = "/OrganizationOwnerUserLogin"; // Redirect to login page
  } else {
    window.location.href = `/Login?role=${data?.role}`; // Redirect to home or default page
  }

  // Remove both token and session data on session expiry
  localStorage.removeItem("token");
  localStorage.removeItem("data"); // Optionally clear session data if needed
};
