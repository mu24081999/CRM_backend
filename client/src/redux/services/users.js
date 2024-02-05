// authActions.js
import axios from "axios";
import {
  invalidRequest,
  getAllUsers,
  userRequestLoading,
} from "../slices/users";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getUsers = (token) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios.get(`${backendURL}/user/get-users`, config).then((response) => {
      console.log("🚀 ~ .then ~ response:", response);
      if (response?.data?.code === 404) {
        return dispatch(invalidRequest(response.data.message));
      }
      dispatch(getAllUsers(response.data.data.usersData));
    });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
