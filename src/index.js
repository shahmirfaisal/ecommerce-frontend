import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.scss";
import "react-notifications/lib/notifications.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { App } from "./App/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { UserAxios, AdminAxios } from "./api/instances";

UserAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("userToken");
    return config;
  },
  (error) => Promise.reject(error)
);

AdminAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = localStorage.getItem("adminToken");
    return config;
  },
  (error) => Promise.reject(error)
);

render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
