import axiosInstance from "./axiosInstance";

export const apiGet = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    // //console.error("GET Error:", url, error.response || error);
    throw error.response?.data?.message || error.message;
  }
};

export const apiPost = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    // //console.error("POST Error:", url, error.response || error);
    throw error.response?.data?.message || error.message;
  }
};

export const apiDelete = async (url) => {
  try {
    await axiosInstance.delete(url);
    return true;
  } catch (error) {
    //console.error("DELETE Error:", url, error.response || error);
    throw error.response?.data?.message || error.message;
  }
};

export const apiUpdate = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    //console.error("UPDATE Error:", url, error.response || error);
    throw error.response?.data?.message || error.message;
  }
};
