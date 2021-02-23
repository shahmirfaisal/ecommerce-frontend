import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Api from "../../api/endpoints";
import { Axios } from "../../api/instances";

const initialState = {
  categories: [],
};

const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await Axios.get(Api.GET_CATEGORIES);
    return res.data.categories;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export { fetchCategories };

export default categoriesSlice.reducer;
