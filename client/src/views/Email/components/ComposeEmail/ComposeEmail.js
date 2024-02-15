import React from "react";

const ComposeEmail = () => {
  return (
    <div class="compose-email-popup">
      <div class="d-flex flex-column h-100">
        <header class="d-flex align-items-center justify-content-between">
          <h6 class="text-white mb-0">Compose Email</h6>
          <div class="d-flex">
            <button
              id="min_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="minus"></i>
                </span>
              </span>
            </button>
            <button
              id="max_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="maximize-2"></i>
                </span>
                <span class="feather-icon">
                  <i data-feather="minimize-2"></i>
                </span>
              </span>
            </button>
            <button
              id="close_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="x"></i>
                </span>
              </span>
            </button>
          </div>
        </header>
        <form>
          <div class="form-group">
            <div class="d-flex flex-wrap">
              <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                <span>
                  <span class="avatar">
                    <img
                      src="dist/img/avatar11.jpg"
                      alt="user"
                      class="avatar-img"
                    />
                  </span>
                  <span class="chip-text">Morgan</span>
                  <button type="button" class="btn-close"></button>
                </span>
              </div>
              <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                <span>
                  <span class="avatar">
                    <img
                      src="dist/img/avatar12.jpg"
                      alt="user"
                      class="avatar-img"
                    />
                  </span>
                  <span class="chip-text">Charliee</span>
                  <button type="button" class="btn-close"></button>
                </span>
              </div>
              <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                <span>
                  <span class="avatar">
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      class="avatar-img"
                    />
                  </span>
                  <span class="chip-text">Winston</span>
                  <button type="button" class="btn-close"></button>
                </span>
              </div>
              <input
                type="text"
                class="form-control border-0 p-0 shadow-none flex-1 mb-2 me-2"
                placeholder="Add recipients"
              />
            </div>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Subject" class="form-control" />
          </div>
          <div class="form-group">
            <textarea class="form-control"></textarea>
          </div>
        </form>
        <div class="compose-email-footer">
          <div>
            <button class="btn btn-primary me-2" type="submit">
              Send
            </button>
            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
              <span
                class="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add flag"
                data-bs-original-title="Add flag"
              >
                <span class="feather-icon">
                  <i data-feather="paperclip"></i>
                </span>
              </span>
            </button>
          </div>
          <div>
            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
              <span
                class="icon"
                data-bs-toggle="Save Draft"
                data-bs-placement="top"
                title="Save Draft"
                data-bs-original-title="Save Draft"
              >
                <span class="feather-icon">
                  <i data-feather="edit"></i>
                </span>
              </span>
            </button>
            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
              <span
                class="icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Delete"
                data-bs-original-title="Delete"
              >
                <span class="feather-icon">
                  <i data-feather="trash-2"></i>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
