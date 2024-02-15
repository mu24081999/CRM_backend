import React from "react";
import {
  FaArchive,
  FaBicycle,
  FaCalendar,
  FaCheckSquare,
  FaCog,
  FaCommentSlash,
  FaEdit,
  FaEyeSlash,
  FaInbox,
  FaMailBulk,
  FaRecycle,
  FaRegCheckCircle,
  FaSort,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const EmailsHeader = () => {
  return (
    <header class="aside-header">
      <a
        class="emailapp-title dropdown-toggle link-dark"
        data-bs-toggle="dropdown"
        href="/"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <h1>Inbox</h1>
      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="/">
          <span class="feather-icon dropdown-icon">
            {/* <i data-feather="inbox"></i> */}
            <FaInbox />
          </span>
          <span>Inbox</span>
        </a>
        <a class="dropdown-item" href="/">
          <span class="feather-icon dropdown-icon">
            {/* <i data-feather="send"></i> */}
            <FaCheckSquare />
          </span>
          <span>Sent</span>
        </a>
        <a class="dropdown-item" href="/">
          <span class="feather-icon dropdown-icon">
            {/* <i data-feather="archive"></i> */}
            <FaArchive />
          </span>
          <span>Archive</span>
        </a>
        <a class="dropdown-item" href="/">
          <span class="feather-icon dropdown-icon">
            {/* <i data-feather="edit"></i> */}
            <FaEdit />
          </span>
          <span>Draft</span>
        </a>
        <a class="dropdown-item" href="/">
          <span class="feather-icon dropdown-icon">
            {/* <i data-feather="trash-2"></i> */}
            <FaTrash />
          </span>
          <span>Trash</span>
        </a>
      </div>
      <div class="d-flex">
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover me-0"
          href="/"
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="refresh-cw"></i> */}
              <FaRecycle />
            </span>
          </span>
        </a>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
          href="/"
          data-bs-toggle="dropdown"
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="settings"></i> */}
              <FaCog />
            </span>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              {/* <i data-feather="mail"></i> */}
              <FaCommentSlash />
            </span>
            <span>Show unread messages</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              {/* <i data-feather="star"></i> */}

              <FaStar />
            </span>
            <span>Show Starred Messages</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              {/* <i data-feather="calendar"></i> */}
              <FaCalendar />
            </span>
            <span>Sort by Date</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              {/* <i data-feather="layout"></i> */}
              <FaSort />
            </span>
            <span>Sort by Category</span>
          </a>
          <a class="dropdown-item" href="/">
            <span class="feather-icon dropdown-icon">
              {/* <i data-feather="check"></i> */}
              <FaCheckSquare />
            </span>
            <span>Mark all as read</span>
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/">
            Settings
          </a>
          <a class="dropdown-item" href="/">
            Help
          </a>
          <a class="dropdown-item" href="/">
            Report a problem{" "}
          </a>
        </div>
        <a
          href="/"
          class="btn btn-icon btn-rounded show-compose-popup btn-primary"
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="edit"></i> */}
              <FaEdit />
            </span>
          </span>
        </a>
      </div>
      <div class="hk-sidebar-togglable"></div>
    </header>
  );
};

export default EmailsHeader;
