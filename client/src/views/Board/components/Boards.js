import React from "react";

const Boards = () => {
  return (
    <div className="tab-pane fade show active" id="tab_boards">
      <h5 className="mb-5">Frequent Boards</h5>
      <div className="row">
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-pink">
                    <span className="initial-wrap">J</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Jampack</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar8.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Morgan"
                  >
                    <img
                      src="dist/img/avatar2.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-soft-danger avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Tooltip text"
                  >
                    <span className="initial-wrap">3+</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 25 min ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-pumpkin">
                    <span className="initial-wrap">A</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Angular - Jampack</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar9.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 5 min ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h5 className="mb-0">All Boards</h5>
        <button className="btn btn-light btn-icon">
          <span className="icon">
            <span className="feather-icon">
              <i data-feather="plus"></i>
            </span>
          </span>
        </button>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-violet">
                    <span className="initial-wrap">R</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>React - Jampack</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar10.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Morgan"
                  >
                    <img
                      src="dist/img/avatar2.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-soft-danger avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Tooltip text"
                  >
                    <span className="initial-wrap">4+</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated Yesterday</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-orange">
                    <span className="initial-wrap">G</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Griffin</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar11.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar8.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Morgan"
                  >
                    <img
                      src="dist/img/avatar7.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-soft-danger avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Tooltip text"
                  >
                    <span className="initial-wrap">W</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 10 min ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-primary">
                    <span className="initial-wrap">P</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Pangong</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar8.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 1 hour ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-info">
                    <span className="initial-wrap">D</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Doodle</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar9.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar10.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Morgan"
                  >
                    <img
                      src="dist/img/avatar11.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-soft-danger avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Tooltip text"
                  >
                    <span className="initial-wrap">3+</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 20 min ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card board-card card-border">
            <div className="card-body">
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-sm avatar-pink">
                    <span className="initial-wrap">P</span>
                  </div>
                </div>
                <div className="media-body">
                  <span>Pogody</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted justify-content-between">
              <div>
                <div className="avatar-group avatar-group-sm avatar-group-overlapped me-3">
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Katharine"
                  >
                    <img
                      src="dist/img/avatar5.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Dean"
                  >
                    <img
                      src="dist/img/avatar6.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Morgan"
                  >
                    <img
                      src="dist/img/avatar7.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                  <div
                    className="avatar avatar-soft-danger avatar-rounded"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Tooltip text"
                  >
                    <span className="initial-wrap">5+</span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className="p-xs me-2">Updated 2 days ago</p>
                <div className="flex-shrink-0">
                  <a
                    className="btn btn-xs btn-icon btn-flush-primary btn-rounded flush-soft-hover"
                    href="/"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Public"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="globe"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div role="menu" className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/">
                      Edit
                    </a>
                    <a className="dropdown-item" href="/">
                      Copy Link
                    </a>
                    <a className="dropdown-item" href="/">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-border border-dashed h-100">
            <div className="card-body d-flex align-items-center justify-content-center">
              <button
                className="btn btn-outline-light btn-block"
                data-bs-toggle="modal"
                data-bs-target="#add_new_board"
              >
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Add New Board"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="plus"></i>
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
