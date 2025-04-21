import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    hobby: ["reading"],
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setHobby: (state, action) => {
      state.hobby.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setHobby } = userSlice.actions;

export default userSlice.reducer;
