import AuthPersist from "@/store/persist/Auth.persist";
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.API_URL ?? "http://kanban-demo.aymannagyahmed.com/api",
  timeout: 5000,
});
API.interceptors.request.use((config) => {
  const token = AuthPersist.getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
API.interceptors.response.use((response) => {
  const token = response.data?.data?.token;
  if (token) {
    console.debug("Setting New User Token");
    AuthPersist.setToken(token);
  }
  return response;
});

export default API;
