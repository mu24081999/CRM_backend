import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "boards",
  initialState: {
    isLoading: false,
    boards: [],
    boardDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    boardRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.boards = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllBoards: (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    boardDetails: (state, action) => {
      state.isLoading = false;
      state.boardDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteBoard: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default boardSlice.reducer;
export const {
  boardRequestLoading,
  invalidRequest,
  getAllBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  boardDetails,
} = boardSlice.actions;
