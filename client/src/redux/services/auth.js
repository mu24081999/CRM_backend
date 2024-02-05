// authActions.js
import axios from "axios";
// import Cookie from "js-cookie";
import {
  invalidRequest,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  authRequestLoading,
  verifyOtp,
} from "../slices/auth";
// import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
// const backendURL = process.env.REACT_APP_BACKEND_URL_LIVE;

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(`${backendURL}/auth/signup_user`, registerData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.code === 404) {
          return dispatch(invalidRequest(response.data.message));
        }

        toast.success(response.data.message);
        dispatch(register(response.data.data.userData));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(`${backendURL}/auth/siginin_user`, { username, password }, config)
      .then((response) => {
        console.log(response.data);
        if (response?.data?.statusCode !== 200) {
          dispatch(invalidRequest(response.data.message));
          return toast.error(response.data.message);
        }
        toast.success(response.data.message);
        dispatch(login(response.data.data.userData));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    toast.error(e.message);
  }
};
export const logoutUser = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    await axios
      .post(
        `${backendURL}/auth/signout_user`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // pass the cookie from the browser
          },
        }
      )
      .then((response) => {
        dispatch(logout(response.data.message));
        return toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const ForgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    await axios
      .post(`${backendURL}/auth/forgot_password`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        dispatch(forgotPassword(response.data.message));
        return toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const verifyOTP = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    await axios
      .post(`${backendURL}/auth/verify_otp`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Host": window.location.host,
        },
      })
      .then((response) => {
        dispatch(verifyOtp(response.data.message));

        toast.success(response.data.message);
        window.location.href =
          "/reset-password/" + response.data.data.otpData.email;
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message);
  }
};
export const ResetPassword = (data) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    await axios
      .post(`${backendURL}/auth/reset_password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(resetPassword(response.data));
        return toast.success(response.data.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
    return toast.error(e.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
export const getMe = (token) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/auth/get_me`, {}, config)
      .then((response) => {
        if (response?.data?.code !== 200) {
          dispatch(invalidRequest(response.data.data.error));
          return toast.error(response.data.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        dispatch(login(response.data));
        // Cookie.set("token", response.data.data.token);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       await axios
//         .post(`${backendURL}/api/user/signin`, { email, password }, config)
//         .then((res) => {
//           console.log(res);
//           login(res);
//         });
//     } catch (error) {
//       // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
