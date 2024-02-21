import React from "react";
import {
  FaArchive,
  FaCheckSquare,
  FaEdit,
  FaInbox,
  FaPlane,
  FaPlus,
  FaRegArrowAltCircleRight,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav class="emailapp-sidebar">
      <div data-simplebar class="nicescroll-bar">
        <div class="menu-content-wrap">
          <button
            type="button"
            class="btn btn-primary btn-rounded btn-block mb-4 show-compose-popup"
            id="show_compose_popup"
          >
            Compose email
          </button>
          <div class="menu-group">
            <ul class="nav nav-light navbar-nav flex-column">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="inbox"></i> */}

                      <FaInbox />
                    </span>
                  </span>
                  <span class="nav-link-text">Inbox</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="star"></i> */}
                      <FaStar />
                    </span>
                  </span>
                  <span class="nav-link-text">Important</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="send"></i> */}
                      <FaCheckSquare />
                    </span>
                  </span>
                  <span class="nav-link-text">Sent</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="archive"></i> */}
                      <FaArchive />
                    </span>
                  </span>
                  <span class="nav-link-text">Archive</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="edit"></i> */}
                      <FaEdit />
                    </span>
                  </span>
                  <span class="nav-link-text">Draft</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="nav-icon-wrap">
                    <span class="feather-icon">
                      {/* <i data-feather="trash-2"></i> */}
                      <FaTrash />
                    </span>
                  </span>
                  <span class="nav-link-text">Trash</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="separator separator-light"></div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="title-sm text-primary mb-0">Categories</div>
            <a
              href="/"
              class="btn btn-xs btn-icon btn-rounded btn-light"
              data-bs-toggle="modal"
              data-bs-target="#add_new_cat"
            >
              <span
                class="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Add Category"
              >
                <span class="feather-icon">
                  {/* <i data-feather="plus"></i> */}
                  <FaPlus />
                </span>
              </span>
            </a>
          </div>
          <div class="menu-group">
            <ul class="nav nav-light navbar-nav flex-column">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="badge badge-primary badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Team</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="badge badge-success badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Support</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="badge badge-orange badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Updates</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  <span class="badge badge-pink badge-indicator badge-indicator-lg me-2"></span>
                  <span class="nav-link-text">Primary</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!--Sidebar Fixnav--> */}
      <div class="emailapp-fixednav">
        <div class="hk-toolbar">
          <ul class="nav nav-light">
            <li class="nav-item nav-link">
              <a
                class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Settings"
                href="/"
              >
                <span class="icon">
                  <span class="feather-icon">
                    <i data-feather="settings"></i>
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item nav-link">
              <a
                href="/"
                class="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Archive"
              >
                <span class="icon">
                  <span class="feather-icon">
                    <i data-feather="archive"></i>
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item nav-link">
              <a
                href="/"
                class="btn btn-icon btn-rounded btn-flush-dark flush-soft-hover"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title=""
                data-bs-original-title="Help"
              >
                <span class="icon">
                  <span class="feather-icon">
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

export default Sidebar;
