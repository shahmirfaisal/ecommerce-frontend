import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { AdminAxios, Axios } from "../../api/instances";
import * as Api from "../../api/endpoints";
import { NotificationManager } from "react-notifications";
import { history } from "../../utils";

const login = createAsyncThunk("admin/login", async ({ email, password }) => {
  try {
    const res = await Axios.post(Api.ADMIN_LOGIN, {
      email,
      password,
    });
    history.push("/admin");
    NotificationManager.success("Logged in!");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
});

const isLogin = createAsyncThunk("admin/isLogin", async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw "ERROR!";

  const res = await AdminAxios.get(Api.IS_ADMIN_LOGIN);
  return res.data;
});

const fetchProducts = createAsyncThunk("admin/fetchProducts", async () => {
  const res = await AdminAxios.get(Api.ADMIN_PRODUCTS);
  return res.data.products;
});

const createProduct = createAsyncThunk(
  "admin/createProduct",
  async ({ name, description, file, status, category, price, quantity }) => {
    try {
      if (!file) throw new Error("Upload image!");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Ecommerce Images");
      const res = await Axios.post(
        "https://api.cloudinary.com/v1_1/dw3ap99ie/image/upload",
        data
      );
      await AdminAxios.post(Api.CREATE_PRODUCT, {
        name,
        description,
        status,
        category,
        price,
        quantity,
        image: res.data.secure_url,
      });
      history.push("/admin/products");
      return "Product created!";
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({
    id,
    name,
    description,
    file,
    status,
    category,
    price,
    quantity,
  }) => {
    try {
      if (!file) throw new Error("Upload image!");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Ecommerce Images");
      const res = await Axios.post(
        "https://api.cloudinary.com/v1_1/dw3ap99ie/image/upload",
        data
      );

      await AdminAxios.patch(Api.UPDATE_PRODUCT(id), {
        name,
        description,
        status,
        category,
        price,
        quantity,
        image: res.data.secure_url,
      });
      history.push("/admin/products");
      return "Product updated!";
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const deleteProduct = createAsyncThunk("admin/deleteProduct", async (id) => {
  const res = await AdminAxios.delete(Api.DELETE_PRODUCT(id));
  return res.data.product._id;
});

const fetchCategories = createAsyncThunk("admin/fetchCategories", async () => {
  const res = await Axios.get(Api.GET_CATEGORIES);
  return res.data.categories;
});

const createCategory = createAsyncThunk(
  "admin/createCategory",
  async ({ name }) => {
    try {
      const res = await AdminAxios.post(Api.CREATE_CATEGORY, { name });
      history.push("/admin/categories");
      NotificationManager.success("Category created!");
      return res.data.category;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const editCategory = createAsyncThunk(
  "admin/editCategory",
  async ({ id, name }) => {
    try {
      const res = await AdminAxios.patch(Api.UPDATE_CATEGORY(id), { name });
      history.push("/admin/categories");
      NotificationManager.success("Category updated!");
      return res.data.category;
    } catch (error) {
      throw error?.response?.data || error.message;
    }
  }
);

const deleteCategory = createAsyncThunk("admin/deleteCategory", async (id) => {
  const res = await AdminAxios.delete(Api.DELETE_CATEGORY(id));
  return res.data.category._id;
});

const fetchAdminOrders = createAsyncThunk(
  "admin/fetchAdminOrders",
  async () => {
    const res = await AdminAxios.get(Api.ADMIN_ORDERS);
    return res.data.orders;
  }
);

const fetchAdminOrder = createAsyncThunk(
  "admin/fetchAdminOrder",
  async (id) => {
    const res = await AdminAxios.get(Api.ADMIN_ORDER(id));
    return res.data.order;
  }
);

const editAdminOrder = createAsyncThunk(
  "admin/editAdminOrder",
  async ({ id, status }) => {
    const res = await AdminAxios.patch(Api.UPDATE_ORDER(id), { status });
    NotificationManager.success("Order's status updated!");
    return res.data.order;
  }
);

const initialState = {
  admin: true,
  authLoading: false,
  loading: false,
  products: [],
  contentLoading: false,
  categories: [],
  orders: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.admin = true;
        localStorage.setItem("adminToken", `Bearer ${action.payload.token}`);
        state.authLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(isLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(isLogin.fulfilled, (state, action) => {
        state.admin = true;
        state.loading = false;
      })
      .addCase(isLogin.rejected, (state, action) => {
        state.loading = false;
        state.admin = false;
        localStorage.removeItem("adminToken");
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.contentLoading = false;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.authLoading = false;
        NotificationManager.success("Product created!");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(editProduct.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.authLoading = false;
        NotificationManager.success("Product updated!");
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.authLoading = false;
        NotificationManager.success("Product deleted!");
        state.products = state.products.filter(
          ({ _id }) => _id != action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.contentLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(createCategory.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.authLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(editCategory.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.authLoading = false;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.authLoading = false;
        NotificationManager.success("Category deleted!");
        state.categories = state.categories.filter(
          ({ _id }) => _id != action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.authLoading = false;
        NotificationManager.error(action.error.message);
      })
      .addCase(fetchAdminOrders.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchAdminOrder.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchAdminOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.contentLoading = false;
      })
      .addCase(editAdminOrder.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(editAdminOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.authLoading = false;
      });
  },
});

export {
  login,
  isLogin,
  fetchProducts,
  createProduct,
  editProduct,
  deleteProduct,
  fetchCategories,
  createCategory,
  editCategory,
  deleteCategory,
  fetchAdminOrders,
  fetchAdminOrder,
  editAdminOrder,
};

export default adminSlice.reducer;
