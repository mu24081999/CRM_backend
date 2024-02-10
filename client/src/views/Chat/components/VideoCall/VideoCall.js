import React from "react";

const VideoCall = ({ selectedRoom, authUser, socket }) => {
  return (
    <div>
      {/* <!--Video Call Window --> */}
      <div
        id="video_call"
        class="modal fade"
        tabIndex="-1"
        role="dialog"
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
                <li>
                  <button
                    class="btn btn-icon btn-lg btn-rounded btn-danger"
                    data-bs-dismiss="modal"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="phone"></i>
                      </span>
                    </span>
                  </button>
                </li>
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
                <img
                  src={
                    selectedRoom.user_id_1 === authUser?.id
                      ? selectedRoom.user_image_1
                      : selectedRoom.user_image_2
                  }
                  alt="user"
                  class="avatar-img"
                />
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
