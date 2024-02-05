import React from "react";

const AudioCall = () => {
  return (
    <div>
      {" "}
      {/* <!--Audio Call Window --> */}
      <div
        id="audio_call"
        class="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-xl chatapp-call-window"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header header-wth-bg">
              <h6 class="modal-title text-muted">Jampack Audio Call</h6>
              <div class="modal-action">
                <a
                  href="/"
                  class="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover modal-fullscreen-togglable"
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
                  class="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover"
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
                <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
              </div>
              <h3 class="mt-3">Huma Therman</h3>
              <p>
                Audio Calling<span class="one">.</span>
                <span class="two">.</span>
                <span class="three">.</span>
              </p>
            </div>
            <div class="modal-footer">
              <ul class="chatapp-call-action hk-list">
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="mic"></i>
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
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
                  <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="user-plus"></i>
                      </span>
                    </span>
                  </button>
                </li>
                <li>
                  <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
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
                  src="dist/img/avatar13.jpg"
                  alt="user"
                  class="avatar-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Audio Call Window --> */}
    </div>
  );
};

export default AudioCall;
