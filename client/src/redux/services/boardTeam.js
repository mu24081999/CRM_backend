// authActions.js
import axios from "axios";
import {
  invalidRequest,
  teamRequestLoading,
  teamDetails,
  addTeam,
  getAllTeams,
  deleteTeam,
  updateTeam,
} from "../slices/board_team";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const storeBoardTeam = (token, data) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/user/board/team/post-team`, data, config)
      .then((response) => {
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTeam(response.data.message));
        toast.success(response.data.message);
        dispatch(getBoardTeamList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getBoardTeamList = (token) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/board/team/get-teams`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllTeams(response.data.data.teamsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getBoardTeamDetails = (token, team_id) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/user/contact/team/team-details/${team_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(teamDetails(response.data.data.teamData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const updateBoardTeamRec =
  (token, team_id, data) => async (dispatch) => {
    try {
      dispatch(teamRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(
          `${backendURL}/user/contact/team/team-update/${team_id}`,
          data,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.status !== 200) {
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateTeam(response.data.message));
          dispatch(getBoardTeamDetails(token));
          toast.success(response.data.message);
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const deleteBoardTeamRec = (token, team_id) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/user/contact/team/delete-team/${team_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteTeam(response.data.message));
        dispatch(getBoardTeamList(token));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
