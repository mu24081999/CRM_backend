import React from "react";
import { FaEnvelope } from "react-icons/fa";

const ChatPopup = () => {
  return (
    <div>
      {/* <!-- Chat Popup --> */}
      <div className="hk-chatbot-popup">
        <header>
          <div className="chatbot-head-top">
            <a
              className="btn btn-sm btn-icon btn-dark btn-rounded"
              href="/"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="more-horizontal"></i>
                </span>
              </span>
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/">
                <i className="dropdown-icon zmdi zmdi-notifications-active"></i>
                <span>Send push notifications</span>
              </a>
              <a className="dropdown-item" href="/">
                <i className="dropdown-icon zmdi zmdi-volume-off"></i>
                <span>Mute Chat</span>
              </a>
            </div>
            <span className="text-white">Chat with Us</span>
            <a
              id="minimize_chatbot"
              href="/"
              className="btn btn-sm btn-icon btn-dark btn-rounded"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="minus"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="separator-full separator-light mt-0 opacity-10"></div>
          <div className="media-wrap">
            <div className="media">
              <div className="media-head">
                <div className="avatar avatar-sm avatar-soft-primary avatar-icon avatar-rounded position-relative">
                  <span className="initial-wrap">
                    <i className="ri-customer-service-2-line"></i>
                  </span>
                  <span className="badge badge-success badge-indicator badge-indicator-lg badge-indicator-nobdr position-bottom-end-overflow-1"></span>
                </div>
              </div>
              <div className="media-body">
                <div className="user-name">Chat Robot</div>
                <div className="user-status">Online</div>
              </div>
            </div>
          </div>
        </header>
        <div className="chatbot-popup-body">
          <div data-simplebar className="nicescroll-bar">
            <div>
              <div className="init-content-wrap">
                <div className="card card-shadow">
                  <div className="card-body">
                    <p className="card-text">
                      Hey I am chat robot 😈
                      <br />
                      Do yo have any question regarding our tools?
                      <br />
                      <br />
                      Select the topic or start chatting.
                    </p>
                    <button className="btn btn-block btn-primary text-nonecase start-conversation">
                      Start a conversation
                    </button>
                  </div>
                </div>
                <div className="btn-wrap">
                  <button className="btn btn-soft-primary text-nonecase btn-rounded start-conversation">
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="eye"></i>
                        </span>
                      </span>
                      <span className="btn-text">Just browsing</span>
                    </span>
                  </button>
                  <button className="btn btn-soft-danger text-nonecase btn-rounded start-conversation">
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="credit-card"></i>
                        </span>
                      </span>
                      <span className="btn-text">
                        I have a question regarding pricing
                      </span>
                    </span>
                  </button>
                  <button className="btn btn-soft-warning text-nonecase btn-rounded start-conversation">
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="cpu"></i>
                        </span>
                      </span>
                      <span className="btn-text">
                        Need help for technical query
                      </span>
                    </span>
                  </button>
                  <button className="btn btn-soft-success text-nonecase btn-rounded start-conversation">
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="zap"></i>
                        </span>
                      </span>
                      <span className="btn-text">
                        I have a pre purchase question
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <ul className="list-unstyled d-none">
                <li className="media sent">
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>I have a plan regarding pricing</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="media received">
                  <div className="avatar avatar-xs avatar-soft-primary avatar-icon avatar-rounded">
                    <span className="initial-wrap">
                      <i className="ri-customer-service-2-line"></i>
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="msg-box">
                      <div>
                        <p>
                          Welcome back!
                          <br />
                          Are you looking to upgrade your existing plan?
                        </p>
                      </div>
                    </div>
                    <div className="msg-box typing-wrap">
                      <div>
                        <div className="typing">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer>
          <div className="chatbot-intro-text fs-7">
            <div className="separator-full separator-light"></div>
            <p className="mb-2">
              This is jampack's beta version please sign up now to get early
              access to our full version
            </p>
            <a className="d-block mb-2" href="/">
              <u>Give Feedback</u>
            </a>
          </div>
          <div className="input-group d-none">
            <div className="input-group-text overflow-show border-0">
              <button
                className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded dropdown-toggle no-caret"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="share"></i>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                      <span className="initial-wrap">
                        <i className="ri-image-line"></i>
                      </span>
                    </div>
                    <div>
                      <span className="h6 mb-0">Photo or Video Library</span>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item" href="/">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                      <span className="initial-wrap">
                        <i className="ri-file-4-line"></i>
                      </span>
                    </div>
                    <div>
                      <span className="h6 mb-0">Documents</span>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item" href="/">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                      <span className="initial-wrap">
                        <i className="ri-map-pin-line"></i>
                      </span>
                    </div>
                    <div>
                      <span className="h6 mb-0">Location</span>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item" href="/">
                  <div className="d-flex align-items-center">
                    <div className="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                      <span className="initial-wrap">
                        <i className="ri-contacts-line"></i>
                      </span>
                    </div>
                    <div>
                      <span className="h6 mb-0">Contact</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <input
              type="text"
              id="input_msg_chat_popup"
              name="send-msg"
              className="input-msg-send form-control border-0 shadow-none"
              placeholder="Type something..."
            />
            <div className="input-group-text overflow-show border-0">
              <button className="btn btn-icon btn-flush-dark flush-soft-hover btn-rounded">
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="smile"></i>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <div className="footer-copy-text">
            Powered by{" "}
            <a className="brand-link" href="/">
              <img src="dist/img/logo-light.png" alt="logo-brand" />
            </a>
          </div>
        </footer>
      </div>
      <a
        href="/"
        className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open"
      >
        <span className="icon">
          <span className="feather-icon">
            {/* <i data-feather="message-circle"></i> */}
            <FaEnvelope />
          </span>
        </span>
      </a>
      <a
        href="/"
        className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded btn-popup-open"
      >
        <span className="icon">
          <span className="feather-icon">
            {/* <i data-feather="message-circle"></i> */}
            <FaEnvelope />
          </span>
        </span>
      </a>
      {/* <div className="chat-popover shadow-xl">
        <p>Try Jampack Chat for free and connect with your customers now!</p>
      </div> */}
      {/* <!-- /Chat Popup --> */}
    </div>
  );
};

export default ChatPopup;
