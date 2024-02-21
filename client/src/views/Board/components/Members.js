import React from "react";

const Members = () => {
  return (
    <div className="tab-pane fade show  active" id="tab_team">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center form-group mb-0">
          <h5 className="mb-0 me-4">Members</h5>
          <label className="flex-shrink-0 mb-0 me-2">Sort by:</label>
          <select className="form-control form-select form-select-sm w-130p">
            <option selected="" value="1">
              Date Created
            </option>
            <option value="2">A - Z</option>
            <option value="3">Z - A</option>
          </select>
        </div>
        <button
          className="btn btn-light btn-icon"
          data-bs-toggle="modal"
          data-bs-target="#add_new_team"
        >
          <span
            className="icon"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=""
            data-bs-original-title="Add New Member"
          >
            <span className="feather-icon">
              <i data-feather="plus"></i>
            </span>
          </span>
        </button>
      </div>

      <div className="row">
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar2.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Designer"
                  >
                    <span>Morgan Freeman</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">morgan@jampack.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar9.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Designer"
                  >
                    <span>Huma Therman</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">huma@clariesup.au</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar7.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Developer"
                  >
                    <span>Tom Cruz</span>
                    <span className="badge badge-danger badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">tomcz@jampack.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-soft-danger avatar-rounded">
                    <span className="initial-wrap">D</span>
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Designer"
                  >
                    <span>Danial Craig</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">danialc@jampack.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar10.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Inventory"
                  >
                    <span>Winston Churchil</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">winston@worthniza.ga</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="media-head">
                    <div className="avatar avatar-rounded">
                      <img
                        src="dist/img/avatar8.jpg"
                        alt="user"
                        className="avatar-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Developer"
                  >
                    <span>Katharine Jones</span>
                    <span className="badge badge-danger badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">joneskath@jampack.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar3.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Hr Manager"
                  >
                    <span>Jaquiline Joker</span>
                    <span className="badge badge-danger badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">jaquljoker@jampack.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-light avatar-rounded">
                    <span className="initial-wrap">J</span>
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Designer"
                  >
                    <span>John Brother</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">john@cryodrakon.info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-rounded">
                    <img
                      src="dist/img/avatar14.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Designer"
                  >
                    <span>John Brother</span>
                    <span className="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">john@cryodrakon.info</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card team-card card-border">
            <div className="card-body">
              <div className="card-action-wrap">
                <button
                  className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span className="icon">
                    <span className="feather-icon">
                      <i data-feather="more-horizontal"></i>
                    </span>
                  </span>
                </button>
                <div role="menu" className="dropdown-menu dropdown-menu-end">
                  <a className="dropdown-item" href="/">
                    Invite for project
                  </a>
                  <a className="dropdown-item" href="/">
                    Copy Link
                  </a>
                  <a className="dropdown-item" href="/">
                    Mail preferences
                  </a>
                </div>
              </div>
              <div className="media align-items-center">
                <div className="media-head">
                  <div className="avatar avatar-soft-success avatar-rounded">
                    <span className="initial-wrap">C</span>
                  </div>
                </div>
                <div className="media-body">
                  <div
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Developer"
                  >
                    <span>Charlie Chaplin</span>
                    <span className="badge badge-danger badge-indicator badge-indicator-nobdr"></span>
                  </div>
                  <div className="text-truncate">charlie@leernoca.monster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-12">
          <div className="card card-border border-dashed h-100">
            <div className="card-body d-flex align-items-center justify-content-center">
              <button
                className="btn btn-icon btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#add_new_team"
              >
                <span
                  className="icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Add New Member"
                >
                  <span className="feather-icon">
                    <i data-feather="plus"></i>
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

export default Members;
