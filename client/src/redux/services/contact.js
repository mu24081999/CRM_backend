// authActions.js
import axios from "axios";
import {
  invalidRequest,
  contactRequestLoading,
  postContact,
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
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
