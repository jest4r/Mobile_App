import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    books: []
  },
  reducers: {
    addProduct: (state, action) => {
      state.books = [...state.books, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
