import { apiGet } from "../../../../services/useApi";

export const fetchServices = async () => {
  try {
    const response = await apiGet(`/api/get-services-by-owner`);
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};
