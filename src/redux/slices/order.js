import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAxios } from "../../api/instances";
import * as Api from "../../api/endpoints";
import { history } from "../../utils";

const initialState = {
  orders: [],
  order: null,
  clientSecret: null,
  contentLoading: false,
  buttonLoading: false,
};

const createPaymentIntent = createAsyncThunk(
  "orders/createPaymentIntent",
  async () => {
    try {
      const res = await UserAxios.post(Api.CREATE_PAYMENT_INTENT);
      return res.data.clientSecret;
    } catch (error) {
      history.replace("/cart");
      throw error;
    }
  }
);

const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const res = await UserAxios.get(Api.GET_ORDERS);
  return res.data.orders;
});

const fetchOrder = createAsyncThunk("orders/fetchOrder", async (id) => {
  const res = await UserAxios.get(Api.GET_ORDER(id));
  return res.data.order;
});

const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id) => {
  const res = await UserAxios.delete(Api.DELETE_ORDER(id));
  history.replace("/orders");
  return res.data.order;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchOrders.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.contentLoading = false;
      })
      .addCase(fetchOrder.pending, (state, action) => {
        state.contentLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.contentLoading = false;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.buttonLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.buttonLoading = false;
      });
  },
});

export { createPaymentIntent, fetchOrders, fetchOrder, deleteOrder };

export default ordersSlice.reducer;
