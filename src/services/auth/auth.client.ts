import API from "../api";

const login = async (credentials: { email: string; password: string }) => {
  await API.post("/login", credentials);
};
const register = async (credentials: {
  email: string;
  name: string;
  password: string;
  c_password: string;
}) => {
  await API.post("/register", credentials);
};
export default {
  login,
  register,
};
