import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    isLoading: false,
    contacts: [],
    contactDetails: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    contactRequestLoading: (state, action) => {
      state.isLoading = true;
      // state.contacts = [];
      // state.message = "";
      // state.error = "";
      // state.token = "";
      // state.type = "";
    },
    invalidRequest: (state, action) => {
      state.isLoading = false;
      state.contacts = [];
      state.message = action.payload;
      state.error = "";
      state.token = "";
      state.type = "InvalidRequestError";
    },
    postContact: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    getContacts: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
      state.message = "success";
      state.error = "";
      state.type = "success";
    },
    deleteContact: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    updateContact: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
      state.type = "success";
    },
    contactDetails: (state, action) => {
      state.isLoading = false;
      state.contactDetails = action.payload;
      state.error = "";
      state.type = "success";
    },
  },
});

export default contactSlice.reducer;
export const {
  contactRequestLoading,
  invalidRequest,
  postContact,
  getContacts,
  deleteContact,
  contactDetails,
  updateContact,
} = contactSlice.actions;
