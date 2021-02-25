import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios, UserAxios } from "../../api/instances";
import * as Api from "../../api/endpoints";
import { history } from "../../utils";
import { NotificationManager } from "react-notifications";

const initialState = {
  user: {},
  loading: false,
  authLoading: false,
  cartLoading: false,
};

const signup = createAsyncThunk(
  "users/signup",
  async ({ name, email, password }) => {
    try {
      const res = await Axios.post(Api.USER_SIGNUP, {
        name,
        email,
        password,
      });
      history.push("/");
      return res.data;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const login = createAsyncThunk("users/login", async ({ email, password }) => {
  try {
    const res = await Axios.post(Api.USER_LOGIN, {
      email,
      password,
    });
    history.push("/");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
});

const isLogin = createAsyncThunk("users/isLogin", async () => {
  const token = localStorage.getItem("userToken");
  if (!token) throw "ERROR!";

  const res = await UserAxios.get(Api.IS_USER_LOGIN);
  return res.data.user;
});

const editUser = createAsyncThunk(
  "users/editUser",
  async ({ name, email, password }) => {
    try {
      const res = await UserAxios.patch(Api.UPDATE_USER, {
        name,
        email,
        password,
      });
      history.push("/profile");
      return res.data.user;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const addToCart = createAsyncThunk("users/addToCart", async (id) => {
  try {
    const res = await UserAxios.post(Api.ADD_TO_CART(id));
    return res.data.user;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
});

const decrementFromCart = createAsyncThunk(
  "users/decrementFromCart",
  async (id) => {
    try {
      const res = await UserAxios.delete(Api.DECREMENT_FROM_CART(id));
      return res.data.user;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const deleteFromCart = createAsyncThunk("users/deleteFromCart", async (id) => {
  try {
    const res = await UserAxios.delete(Api.DELETE_FROM_CART(id));
    return res.data.user;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userLogout(state, action) {
      localStorage.removeItem("userToken");
      state.user = null;
      NotificationManager.success("Logged out!");
    },
    emptyCart(state, action) {
      state.user.cart = {
        items: [],
        price: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("userToken", `Bearer ${action.payload.token}`);
        state.authLoading = false;
        NotificationManager.success("Signed up!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(login.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("userToken", `Bearer ${action.payload.token}`);
        state.authLoading = false;
        NotificationManager.success("Logged in!");
      })
      .addCase(login.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(isLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(isLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(isLogin.rejected, (state, action) => {
        state.loading = false;
        localStorage.removeItem("userToken");
        state.user = null
      })
      .addCase(editUser.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authLoading = false;
        NotificationManager.success("Profile updated!");
      })
      .addCase(editUser.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(addToCart.pending, (state, action) => {
        state.cartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.user = action.payload;
        state.cartLoading = false;
        NotificationManager.success("Added to cart");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartLoading = false;
        if (action.error.message === "Unauthenticated") {
          NotificationManager.error("Login to continue!");
        } else {
          NotificationManager.error(action.error.message);
        }
      })
      .addCase(decrementFromCart.pending, (state, action) => {
        state.cartLoading = true;
      })
      .addCase(decrementFromCart.fulfilled, (state, action) => {
        state.user = action.payload;
        state.cartLoading = false;
      })
      .addCase(decrementFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(deleteFromCart.pending, (state, action) => {
        state.cartLoading = true;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.user = action.payload;
        state.cartLoading = false;
        NotificationManager.success("Item removed!");
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        NotificationManager.error(action.error.message);
      });
  },
});

export {
  signup,
  login,
  isLogin,
  editUser,
  addToCart,
  decrementFromCart,
  deleteFromCart,
};

export const { userLogout, emptyCart } = usersSlice.actions;

export default usersSlice.reducer;
