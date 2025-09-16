import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // ajuste sua URL
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
