import React from "react";

const EmailDetailsHeader = () => {
  return (
    <header class="email-header">
      <a
        id="back_email_list"
        class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover back-user-list"
        href="/"
      >
        <span class="icon">
          <span class="feather-icon">
            <i data-feather="chevron-left"></i>
          </span>
        </span>
      </a>
      <div class="email-options-wrap">
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Add flag"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="flag"></i>
            </span>
          </span>
        </a>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
          href="/"
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
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Folder"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="folder"></i>
            </span>
          </span>
        </a>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Snooze"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="clock"></i>
            </span>
          </span>
        </a>
        <div class="v-separator"></div>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover ms-0"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Print"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="printer"></i>
            </span>
          </span>
        </a>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Delete"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="trash-2"></i>
            </span>
          </span>
        </a>
      </div>
      <div class="email-options-wrap">
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Previous"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-left"></i>
            </span>
          </span>
        </a>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover emailapp-info-toggle d-xl-inline-block d-none"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Next"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-right"></i>
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
              <i data-feather="more-vertical"></i>
            </span>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="/">
            Mark as read
          </a>
          <a class="dropdown-item" href="/">
            Mark as important
          </a>
          <a class="dropdown-item" href="/">
            Mute
          </a>
          <a class="dropdown-item" href="/">
            Delete
          </a>
          <a class="dropdown-item" href="/">
            Block Contact
          </a>
        </div>
        <a
          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable"
          href="/"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title=""
          data-bs-original-title="Collapse"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-up"></i>
            </span>
            <span class="feather-icon d-none">
              <i data-feather="chevron-down"></i>
            </span>
          </span>
        </a>
      </div>
    </header>
  );
};

export default EmailDetailsHeader;
