// Admin routes
export const ADMIN_LOGIN = "/admin/login";
export const IS_ADMIN_LOGIN = "/admin/is-login";
export const ADMIN_PRODUCTS = "/admin/product";
export const ADMIN_PRODUCT = (id) => `/admin/product/${id}`;
export const ADMIN_ORDERS = "/admin/order";
export const ADMIN_ORDER = (id) => `/admin/order/${id}`;

// User routes
export const USER_SIGNUP = "/user/signup";
export const USER_LOGIN = "/user/login";
export const IS_USER_LOGIN = "/user/is-login";
export const UPDATE_USER = "/user";
export const GET_USER = "/user";

// Product routes
export const CREATE_PRODUCT = "/product";
export const UPDATE_PRODUCT = (id) => `/product/${id}`;
export const DELETE_PRODUCT = (id) => `/product/${id}`;
export const GET_PRODUCT = (id) => `/product/${id}`;
export const GET_PRODUCTS = "/product";
export const GET_CATEGORY_PRODUCTS = (id) => `/product/category/${id}`;
export const CREATE_REVIEW = (id) => `/product/${id}/review`;

// Category routes
export const CREATE_CATEGORY = "/category";
export const UPDATE_CATEGORY = (id) => `/category/${id}`;
export const DELETE_CATEGORY = (id) => `/category/${id}`;
export const GET_CATEGORY = (id) => `/category/${id}`;
export const GET_CATEGORIES = "/category";

// Cart routes
export const ADD_TO_CART = (id) => `/cart/${id}`;
export const DECREMENT_FROM_CART = (id) => `/cart/decrement/${id}`;
export const DELETE_FROM_CART = (id) => `/cart/${id}`;

// Order routes
export const CREATE_ORDER = "/order";
export const UPDATE_ORDER = (id) => `/order/${id}`;
export const DELETE_ORDER = (id) => `/order/${id}`;
export const GET_ORDER = (id) => `/order/${id}`;
export const GET_ORDERS = "/order";

// Payment routes
export const CREATE_PAYMENT_INTENT = "/create-payment-intent";
