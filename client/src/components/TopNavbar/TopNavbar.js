import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/services/auth";
import defaultAvatar from "../../assets/dist/img/avatar12.jpg";
import _ from "lodash";
import Dialer from "../PhoneDialer/Dialer";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const handleLogOut = () => {
    dispatch(logoutUser(token));
  };
  const username = user?.username;
  const avatarHeading = _.toUpper(username?.slice(0, 2));
  // const avatarHeading = "UM";

  return (
    <nav className="hk-navbar navbar navbar-expand-xl navbar-light fixed-top">
      <div className="container-fluid">
        {/* <!-- Start Nav --> */}
        <div className="nav-start-wrap">
          <button className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover navbar-toggle d-xl-none">
            <span className="icon">
              <span className="feather-icon">
                <i data-feather="align-left"></i>
              </span>
            </span>
          </button>

          {/* <!-- Search --> */}
          <form className="dropdown navbar-search">
            <div
              className="dropdown-toggle no-caret"
              data-bs-toggle="dropdown"
              data-dropdown-animation
              data-bs-auto-close="outside"
            >
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover  d-xl-none"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="search"></i>
                  </span>
                </span>
              </a>
              <div className="input-group d-xl-flex d-none">
                <span className="input-affix-wrapper input-search affix-border">
                  <input
                    type="text"
                    className="form-control  bg-transparent"
                    data-navbar-search-close="false"
                    placeholder="Search..."
                    aria-label="Search"
                  />

                  <span className="input-suffix">
                    <span>/</span>
                    <span className="btn-input-clear">
                      <i className="bi bi-x-circle-fill"></i>
                    </span>
                    <span
                      className="spinner-border spinner-border-sm input-loader text-primary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div className="dropdown-menu p-0">
              {/* <!-- Mobile Search --> */}
              <div className="dropdown-item d-xl-none bg-transparent">
                <div className="input-group mobile-search">
                  <span className="input-affix-wrapper input-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                    <span className="input-suffix">
                      <span className="btn-input-clear">
                        <i className="bi bi-x-circle-fill"></i>
                      </span>
                      <span
                        className="spinner-border spinner-border-sm input-loader text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              {/* <!--/ Mobile Search --> */}
              <div data-simplebar className="dropdown-body p-2">
                <h6 className="dropdown-header">Recent Search</h6>
                <div className="dropdown-item bg-transparent">
                  <a href="/" className="badge badge-pill badge-soft-secondary">
                    Grunt
                  </a>
                  <a href="/" className="badge badge-pill badge-soft-secondary">
                    Node JS
                  </a>
                  <a href="/" className="badge badge-pill badge-soft-secondary">
                    SCSS
                  </a>
                </div>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header">Help</h6>
                <a href="/" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                        <span className="initial-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-corner-down-right"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">How to setup theme?</div>
                  </div>
                </a>
                <a href="/" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-icon avatar-xs avatar-soft-light avatar-rounded">
                        <span className="initial-wrap">
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-corner-down-right"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M6 6v6a3 3 0 0 0 3 3h10l-4 -4m0 8l4 -4"></path>
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="media-body">View detail documentation</div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header">Users</h6>
                <a href="/" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-rounded">
                        <img
                          src="dist/img/avatar3.jpg"
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">Sarah Jone</div>
                  </div>
                </a>
                <a href="/" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-soft-primary avatar-rounded">
                        <span className="initial-wrap">J</span>
                      </div>
                    </div>
                    <div className="media-body">Joe Jackson</div>
                  </div>
                </a>
                <a href="/" className="dropdown-item">
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-rounded">
                        <img
                          src="dist/img/avatar4.jpg"
                          alt="user"
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">Maria Richard</div>
                  </div>
                </a>
              </div>
              <div className="dropdown-footer d-xl-flex d-none">
                <a href="/">
                  <u>Search all</u>
                </a>
              </div>
            </div>
          </form>
          {/* <!-- /Search --> */}
        </div>
        {/* <!-- /Start Nav --> */}

        {/* <!-- End Nav --> */}
        <div className="nav-end-wrap">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <a
                href="email.html"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
              >
                <span className="icon">
                  <span className=" position-relative">
                    <span className="feather-icon">
                      <i data-feather="inbox"></i>
                    </span>
                    <span className="badge badge-sm badge-soft-primary badge-sm badge-pill position-top-end-overflow-1">
                      4
                    </span>
                  </span>
                </span>
              </a>
            </li>
            {/* <li className="nav-item">
              <Dialer />
            </li> */}
            <li className="nav-item">
              <div className="dropdown dropdown-notifications">
                <a
                  href="/"
                  className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover dropdown-toggle no-caret"
                  data-bs-toggle="dropdown"
                  data-dropdown-animation
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="icon">
                    <span className="position-relative">
                      <span className="feather-icon">
                        <i data-feather="bell"></i>
                      </span>
                      <span className="badge badge-success badge-indicator position-top-end-overflow-1"></span>
                    </span>
                  </span>
                </a>

                <div className="dropdown-menu dropdown-menu-end p-0">
                  <h6 className="dropdown-header px-4 fs-6">
                    Notifications
                    <a
                      href="/"
                      className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="settings"></i>
                        </span>
                      </span>
                    </a>
                  </h6>
                  <div data-simplebar className="dropdown-body  p-2">
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-rounded avatar-sm">
                            <img
                              src="dist/img/avatar2.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Morgan Freeman accepted your invitation to join
                              the team
                            </div>
                            <div className="notifications-info">
                              <span className="badge badge-soft-success">
                                Collaboration
                              </span>
                              <div className="notifications-time">
                                Today, 10:14 PM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-success avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="inbox"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              New message received from Alan Rickman
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Today, 7:51 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-pink avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="clock"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              You have a follow up with Jampack Head on Friday,
                              Dec 19 at 9:30 am
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Yesterday, 9:25 PM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-sm avatar-rounded">
                            <img
                              src="dist/img/avatar3.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Application of Sarah Williams is waiting for your
                              approval
                            </div>
                            <div className="notifications-info">
                              <div className="notifications-time">
                                Today 10:14 PM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-sm avatar-rounded">
                            <img
                              src="dist/img/avatar10.jpg"
                              alt="user"
                              className="avatar-img"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Winston Churchil shared a document with you
                            </div>
                            <div className="notifications-info">
                              <span className="badge badge-soft-violet">
                                File Manager
                              </span>
                              <div className="notifications-time">
                                2 Oct, 2021
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="/" className="dropdown-item">
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-danger avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="calendar"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              Last 2 days left for the project to be completed
                            </div>
                            <div className="notifications-info">
                              <span className="badge badge-soft-orange">
                                Updates
                              </span>
                              <div className="notifications-time">
                                14 Sep, 2021
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="dropdown-footer">
                    <a href="/">
                      <u>View all notifications</u>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div className="dropdown ps-2">
                <a
                  className=" dropdown-toggle no-caret"
                  href="/"
                  role="button"
                  data-bs-display="static"
                  data-bs-toggle="dropdown"
                  data-dropdown-animation
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <div className="avatar avatar-rounded avatar-xs">
                    <img
                      src={defaultAvatar}
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="p-2">
                    <div className="media">
                      <div className="media-head me-2">
                        <div className="avatar avatar-primary avatar-sm avatar-rounded">
                          <span className="initial-wrap">{avatarHeading}</span>
                        </div>
                      </div>
                      <div className="media-body">
                        <div className="dropdown">
                          <a
                            href="/"
                            className="d-block dropdown-toggle link-dark fw-medium"
                            data-bs-toggle="dropdown"
                            data-dropdown-animation
                            data-bs-auto-close="inside"
                          >
                            {user.username}
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <div className="p-2">
                              <div className="media align-items-center active-user mb-3">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-primary avatar-xs avatar-rounded">
                                    <span className="initial-wrap">
                                      {avatarHeading}
                                    </span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <a
                                    href="/"
                                    className="d-flex align-items-center link-dark"
                                  >
                                    {user?.username}
                                    <i className="ri-checkbox-circle-fill fs-7 text-primary ms-1"></i>
                                  </a>

                                  <a
                                    href="/"
                                    className="d-block fs-8 link-secondary"
                                  >
                                    <u>Manage your account</u>
                                  </a>
                                </div>
                              </div>
                              <div className="media align-items-center mb-3">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-rounded">
                                    <img
                                      src="dist/img/avatar12.jpg"
                                      alt="user"
                                      className="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div className="media-body">
                                  <a href="/" className="d-block link-dark">
                                    Jampack Team
                                  </a>
                                  <a
                                    href="/"
                                    className="d-block fs-8 link-secondary"
                                  >
                                    {user?.email}
                                  </a>
                                </div>
                              </div>
                              <button className="btn btn-block btn-outline-light btn-sm">
                                <span>
                                  <span className="icon">
                                    <span className="feather-icon">
                                      <i data-feather="plus"></i>
                                    </span>
                                  </span>
                                  <span>Add Account</span>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="fs-7">contact@hencework.com</div>
                        <button
                          onClick={handleLogOut}
                          className="d-block fs-8 link-secondary btn btn-light text-dark btn-sm"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="profile.html">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/">
                    <span className="me-2">Offers</span>
                    <span className="badge badge-sm badge-soft-pink">2</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <h6 className="dropdown-header">Manage Account</h6>
                  <a className="dropdown-item d-flex" href="/">
                    <span className="dropdown-icon pt-1 feather-icon">
                      <i data-feather="credit-card"></i>
                    </span>
                    <span>Payment methods</span>
                  </a>
                  <a className="dropdown-item d-flex" href="/">
                    <span className="dropdown-icon pt-1 feather-icon">
                      <i data-feather="check-square"></i>
                    </span>
                    <span>Subscriptions</span>
                  </a>
                  <a className="dropdown-item d-flex" href="/">
                    <span className="dropdown-icon pt-1 feather-icon">
                      <i data-feather="settings"></i>
                    </span>
                    <span>Settings</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item flex" href="/">
                    <span className="dropdown-icon pt-1 feather-icon">
                      <i data-feather="tag"></i>
                    </span>
                    <span>Raise a ticket</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/">
                    Terms & Conditions
                  </a>
                  <a className="dropdown-item" href="/">
                    Help & Support
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* <!-- /End Nav --> */}
      </div>
    </nav>
  );
};

export default TopNavbar;
