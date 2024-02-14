// authActions.js
import axios from "axios";
import {
  invalidRequest,
  contactRequestLoading,
  postContact,
  getContacts,
  deleteContact,
  contactDetails,
} from "../slices/contact";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addContact = (token, data) => async (dispatch) => {
  try {
    dispatch(contactRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/contact/post-contact`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.code === 404) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(postContact(response.data.message));
        toast.success(response.data.message);
        dispatch(getContactsList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getContactsList = (token) => async (dispatch) => {
  try {
    dispatch(contactRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/contact/get-contacts`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getContacts(response.data.data.contactsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getContactDetais = (token, contact_id) => async (dispatch) => {
  try {
    dispatch(contactRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/contact/contact-details/${contact_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(contactDetails(response.data.data.contactData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteContactRec = (token, contact_id) => async (dispatch) => {
  try {
    dispatch(contactRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/contact/delete-contact/${contact_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteContact(response.data.message));
        dispatch(getContactsList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
