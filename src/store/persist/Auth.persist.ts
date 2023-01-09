const TOKEN_KEY = "user_token";
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

const isAuthenticated = () => {
  return getToken();
};

const USER_KEY = "user_data";
type User = {
  name: string;
};
const setUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = (): User | null => {
  return JSON.parse(localStorage.getItem(USER_KEY) ?? "");
};

const clearUser = () => {
  return localStorage.removeItem(USER_KEY);
};

export default {
  getToken,
  setToken,
  clearToken,
  isAuthenticated,
  getUser,
  setUser,
  clearUser,
};
