import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    token: ""
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setName, setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
