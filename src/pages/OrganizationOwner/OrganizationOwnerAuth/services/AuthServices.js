import { apiGet, apiPost } from "../../../../services/useApi";

export const loginUser = async (email, password, role) => {
  try {
    const data = await apiPost("/api/login", { email, password });
    console.log(data.user.role);
    if (data && data.user.role !== role) {
      throw new Error(
        "Unauthorized: You do not have permission to access this page."
      );
    }
    // ✅ Store the token after login
    localStorage.setItem("token", data.token);
    localStorage.setItem("data", JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await apiPost("/api/register", userData);
    // console.log(data);
    // if (data && data.user.role !== role) {
    //   throw new Error(
    //     "Unauthorized: You do not have permission to access this page."
    //   );
    // }
    // ✅ Store the token after login
    localStorage.setItem("token", data.token);
    localStorage.setItem("data", JSON.stringify(data.user));
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
  console.warn("Session expired. Logging out...");
  localStorage.removeItem("token"); // Remove expired token
  window.location.href = "/OrganizationOwnerLogin"; // Redirect to login page
};
