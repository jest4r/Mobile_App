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
    removeProduct: (state, action) => {
      const idsToRemove = action.payload; 
      state.books = state.books.filter(book => !idsToRemove.includes(book.id));
    }
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
