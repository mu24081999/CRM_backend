import React from "react";
import {
  FaLayerGroup,
  FaLock,
  FaPlus,
  FaStar,
  FaTrash,
  FaUserCheck,
} from "react-icons/fa";
const SideNav = () => {
  return (
    <nav className="taskboardapp-sidebar">
      <div data-simplebar className="nicescroll-bar">
        <div className="menu-content-wrap">
          <button
            className="btn btn-primary btn-rounded btn-block mb-4"
            data-bs-toggle="modal"
            data-bs-target="#add_new_board"
          >
            Add New Board
          </button>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="layout"></i> */}
                      <FaLayerGroup />
                    </span>
                  </span>
                  <span className="nav-link-text">All Boards</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span className="nav-link-text">Stared Boards</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="lock"></i> */}
                      <FaLock />
                    </span>
                  </span>
                  <span className="nav-link-text">Private Boards</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="user-check"></i> */}
                      <FaUserCheck />
                    </span>
                  </span>
                  <span className="nav-link-text">Public Boards</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span className="nav-icon-wrap">
                    <span className="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span className="nav-link-text">Deleted</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="separator separator-light"></div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="title-sm text-primary mb-0">Favourite Boards</div>
            <a
              href="/"
              className="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_fav_board"
            >
              <span
                className="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Add Board"
              >
                <span className="feather-icon">
                  {/* <i data-feather="plus"></i> */}
                  <FaPlus />
                </span>
              </span>
            </a>
          </div>
          <div className="menu-group">
            <ul className="nav nav-light navbar-nav flex-column">
              <li className="nav-item">
                <div>
                  <div className="media d-flex align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-primary avatar-rounded">
                        <span className="initial-wrap">J</span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div>
                        <div className="name">Jampack</div>
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="lock"></i>
                        </span>
                      </span>
                    </button>
                    <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div>
                  <div className="media d-flex align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-pink avatar-rounded">
                        <span className="initial-wrap">H</span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div>
                        <div className="name">Hencework</div>
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="globe"></i>
                        </span>
                      </span>
                    </button>
                    <button className="btn btn-sm btn-icon btn-rounded btn-flush-light flush-soft-hover">
                      <span className="icon">
                        <span className="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="alert alert-warning mt-5" role="alert">
            <h6 className="heading-wth-icon alert-heading">
              <span className="head-icon">
                <span className="feather-icon">
                  <i data-feather="zap-off"></i>
                </span>
              </span>
              Trial Ends on 14 Jan
            </h6>
            <p className="fs-7">
              Last 3 days left for your trial to end. Renew now to stay
              connected.
            </p>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div className="taskboardapp-fixednav">
        <div className="hk-toolbar">
          <ul className="nav nav-light">
            <li className="nav-item nav-link">
              <a
                className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
                href="/"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="settings"></i>
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Archive"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="archive"></i>
                  </span>
                </span>
              </a>
            </li>
            <li className="nav-item nav-link">
              <a
                href="/"
                className="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Help"
              >
                <span className="icon">
                  <span className="feather-icon">
                    <i data-feather="book"></i>
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!--/ Sidebar Fixnav--> */}
    </nav>
  );
};

export default SideNav;
