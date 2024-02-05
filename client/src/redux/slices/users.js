import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    message: "",
    error: "",
    token: "",
    type: "",
  },
  reducers: {
    userRequestLoading: (state, action) => {
      state.isLoading = true;
      state.users = [];
      state.message = "";
      state.error = "";
      state.token = "";
      state.type = "";
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.users = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllUsers: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.message = "success";
      state.error = "";
      state.token = "";
      state.type = "success";
    },
  },
});

export default userSlice.reducer;
export const { userRequestLoading, invalidRequest, getAllUsers } =
  userSlice.actions;
