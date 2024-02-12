import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SocketContext } from "../../../../Context";

import { FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { Grid, Box, Heading } from "@chakra-ui/react";
const VideoCall = ({ selectedRoom, authUser, socket }) => {
  const {
    isCalling,
    callAccepted,
    stream,
    myVideo,
    call,
    answerCall,
    // name,
    userVideo,
    callEnded,
    leaveCall,
    openCalling,
    callUser,
  } = useContext(SocketContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [usersArray, setUsersArray] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isCalling, call.isRecieving);
  const callToUser = useCallback(() => {
    if (!isCalling && !call.isRecieving && openCalling) {
      callUser(selectedUser?.socket_id, authUser.name);
    }
  }, [callUser, selectedUser, authUser, isCalling, call, openCalling]);
  useMemo(() => {
    callToUser();
  }, [callToUser]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersArray(users);
    }
  }, [users]);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    const selectedId =
      selectedRoom.user_id_1 === authUser.id
        ? selectedRoom.user_id_2
        : selectedRoom.user_id_1;
    if (usersArray?.length > 0) {
      const response = usersArray?.filter((user) => user.id === selectedId);
      setSelectedUser(response[0]);
    }
  }, [usersArray, authUser, selectedRoom]);
  return (
    <div>
      {/* <!--Video Call Window --> */}
      <div
        id="video_call"
        class="modal"
        tabIndex="-1"
        role="dialog"
        togg="modal"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-xl chatapp-call-window"
          role="document"
        >
          <div class="modal-content bg-primary-dark-5">
            <div class="modal-header header-wth-bg bg-primary-dark-3">
              <h6 class="modal-title text-muted">Jampack Video Call</h6>
              <div class="modal-action">
                <a
                  href="/"
                  class="btn btn-xs btn-icon btn-rounded btn-link link-secondary modal-fullscreen-togglable"
                >
                  <span class="icon">
                    <span class="feather-icon">
                      <i data-feather="maximize"></i>
                    </span>
                    <span class="feather-icon d-none">
                      <i data-feather="minimize"></i>
                    </span>
                  </span>
                </a>
                <a
                  href="/"
                  class="btn btn-xs btn-icon btn-rounded btn-link link-secondary"
                >
                  <span class="icon">
                    <span class="feather-icon">
                      <i data-feather="help-circle"></i>
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div class="modal-body">
              {!callAccepted && (
                <div class="avatar avatar-xxxl avatar-rounded d-20">
                  <img
                    src={
                      selectedRoom.user_id_1 === authUser?.id
                        ? selectedRoom.user_image_2
                        : selectedRoom.user_image_1
                    }
                    alt="user"
                    class="avatar-img"
                  />
                </div>
              )}
              {/* user's video */}
              {callAccepted && !callEnded && (
                <Box>
                  <Grid colSpan={1}>
                    <Heading as="h5">{call.name || "Name"}</Heading>
                    <video
                      playsInline
                      ref={userVideo}
                      autoPlay
                      width="600"
                      controls="true"
                    />
                  </Grid>
                </Box>
              )}
              <h3 class="text-white mt-3">
                {selectedRoom.user_id_1 === authUser?.id
                  ? selectedRoom.user_name_2
                  : selectedRoom.user_name_1}
              </h3>
              <p class="text-white">
                Video Calling<span class="one">.</span>
                <span class="two">.</span>
                <span class="three">.</span>
              </p>
            </div>
            <div class="modal-footer">
              <ul class="chatapp-call-action hk-list">
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="mic"></i>
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="video"></i>
                      </span>
                    </span>
                  </button>
                </li>
                {call.isReceivingCall === true &&
                authUser.socket_id !== call.from &&
                !callAccepted ? (
                  <li>
                    <button
                      class="btn btn-icon btn-lg btn-rounded btn-success"
                      // data-bs-dismiss="modal"
                      onClick={answerCall}
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          {/* <i data-feather="phone"></i> */}
                          <FaPhone />
                        </span>
                      </span>
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      class="btn btn-icon btn-lg btn-rounded btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() => leaveCall(selectedUser.socket_id)}
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          {/* <i data-feather="phone"></i> */}
                          <FaPhone />
                        </span>
                      </span>
                    </button>
                  </li>
                )}

                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="user-plus"></i>
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
              <div class="avatar avatar-lg avatar-rounded chatapp-caller-img">
                {stream && (
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    autoPlay
                    width="140"
                    height="150"
                    controls="true"
                  />
                )}
                {/* <img
                  src={
                    selectedRoom.user_id_1 === authUser?.id
                      ? selectedRoom.user_image_1
                      : selectedRoom.user_image_2
                  }
                  alt="user"
                  class="avatar-img"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Video Call Window --> */}
    </div>
  );
};

export default VideoCall;
