import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "teams",
  initialState: {
    isLoading: false,
    teams: [],
    teamDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    teamRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.teams = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    getAllTeams: (state, action) => {
      state.isLoading = false;
      state.teams = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    teamDetails: (state, action) => {
      state.isLoading = false;
      state.teamDetails = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    addTeam: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateTeam: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    deleteTeam: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default teamSlice.reducer;
export const {
  teamRequestLoading,
  invalidRequest,
  getAllTeams,
  addTeam,
  updateTeam,
  deleteTeam,
  teamDetails,
} = teamSlice.actions;
