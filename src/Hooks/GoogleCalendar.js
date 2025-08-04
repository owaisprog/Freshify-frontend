import { apiGet } from "../services/useApi";

export const handleConnectGoogle = async () => {
  try {
    const { url } = await apiGet(`/api/auth/google`);
    //consoe.log(url, "........");
    window.location.href = url;
  } catch (err) {
    console.error("Error connecting to Google:", err);
  }
};
