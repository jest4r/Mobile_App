import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
export default configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
  },
});
