import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import categoriesReducer from "./slices/category";
import usersReducer from "./slices/user";
import adminReducer from "./slices/admin";
import ordersReducer from "./slices/order";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    admin: adminReducer,
    orders: ordersReducer,
  },
});

export { store };
