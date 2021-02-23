import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

const userInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});
userInstance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "userToken"
);

const adminInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});
adminInstance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "adminToken"
);

export {
  instance as Axios,
  userInstance as UserAxios,
  adminInstance as AdminAxios,
};
