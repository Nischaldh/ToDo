import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {

    console.log("Making request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      data: config.data,
    });

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(" Token attached to request");
    } else {
      console.log("No token found in localStorage");
    }

    return config;
  },
  (error) => {
    console.log("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {

    console.log("📥 Response received:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });

    return response.data;
  },
  (error) => {

    console.log("Response error:", {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'unknown',
      responseData: error.response?.data,
    });

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default api;
