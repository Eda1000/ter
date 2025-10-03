import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1",
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("@Selad-adm:access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
