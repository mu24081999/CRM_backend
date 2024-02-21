// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getEmails,
  emailRequestLoading,
  updateEmail,
  sendEmail,
} from "../slices/email";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getEmailList = (token) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/email/get-emails`, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getEmails(response.data.data.emailsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendEmailRec = (token, data) => async (dispatch) => {
  console.log("🚀 ~ sendEmailRec ~ data:", data);
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/email/send-email`, data, config)
      .then((response) => {
        console.log(response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendEmail(response.data.message));
        dispatch(getEmailList(token));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateEmailRec = (token, emailId, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/email/update-email/${emailId}`, data, config)
      .then((response) => {
        if (response?.data?.code !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateEmail(response.data.message));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
