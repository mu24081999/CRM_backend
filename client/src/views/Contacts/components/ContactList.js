import React from "react";

const ContactList = () => {
  return (
    <div className="contact-list-view">
      <table id="datable_1" className="table nowrap w-100 mb-5">
        <thead>
          <tr>
            <th>
              <span className="form-check mb-0">
                <input
                  type="checkbox"
                  className="form-check-input check-select-all"
                  id="customCheck1"
                />
                <label className="form-check-label" for="customCheck1"></label>
              </span>
            </th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Tags</th>
            <th>Labels</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar1.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Morgan Freeman</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">morgan@jampack.com</td>
            <td>+145 52 5689</td>
            <td>
              <span className="badge badge-soft-violet my-1  me-2">
                Promotion
              </span>
              <span className="badge badge-soft-danger  my-1  me-2">
                Collaborator
              </span>
            </td>
            <td>Design</td>
            <td>13 Jan, 2020</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar9.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Huma Therman</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">huma@clariesup.au</td>
            <td>+234 48 2365</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Collaborator
              </span>
              <span className="badge badge-soft-success  my-1  me-2">
                Angular Developer
              </span>
            </td>
            <td>Developer</td>
            <td>13 Jan, 2020</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-soft-info avatar-rounded">
                    <span className="initial-wrap">C</span>
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Charlie Chaplin</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">charlie@leernoca.monster</td>
            <td>+741 56 7896</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Collaborator
              </span>
            </td>
            <td>Inventory</td>
            <td>13 Jan, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar10.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Winston Churchil</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">winston@worthniza.ga</td>
            <td>+145 52 5463</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Promotion
              </span>
              <span className="badge badge-soft-light my-1  me-2">
                Advertisement
              </span>
            </td>
            <td>Human Resource</td>
            <td>13 Jan, 2020</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
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
                <div className="media-body">
                  <span className="d-block text-high-em">Jaquiline Joker</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">jaquljoker@jampack.com</td>
            <td>+145 53 4715</td>
            <td>
              <span className="badge badge-soft-violet my-1  me-2">
                Promotion
              </span>
              <span className="badge badge-soft-danger  my-1  me-2">
                Collaborator
              </span>
            </td>
            <td>Design</td>
            <td>3 July, 2020</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar7.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Tom Cruz</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">tomcz@jampack.com</td>
            <td>+456 52 4862</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Collaborator
              </span>
              <span className="badge badge-soft-warning my-1  me-2">
                Angular Developer
              </span>
            </td>
            <td>Inventory</td>
            <td>24 Jun, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar2.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Danial Craig</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">danialc@jampack.com</td>
            <td>+145 52 5689</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Collaborator
              </span>
            </td>
            <td>Developer</td>
            <td>24 Jun, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar8.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Katharine Jones</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">joneskath@jampack.com</td>
            <td>+741 56 7896</td>
            <td>
              <span className="badge badge-soft-violet my-1  me-2">
                Promotion
              </span>
            </td>
            <td>Inventory</td>
            <td>24 Jun, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-primary avatar-rounded">
                    <span className="initial-wrap">H</span>
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Hence Work</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">contact@hencework.com</td>
            <td>+145 52 5463</td>
            <td>
              <span className="badge badge-soft-violet my-1  me-2">
                Promotion
              </span>
            </td>
            <td>Design</td>
            <td>30 Mar, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star marked">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-rounded">
                    <img
                      src="dist/img/avatar13.jpg"
                      alt="user"
                      className="avatar-img"
                    />
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">Dean Shaw</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">dean-shaw@poww.me</td>
            <td>+234 48 2365</td>
            <td>
              <span className="badge badge-soft-danger my-1  me-2">
                Collaborator
              </span>
              <span className="badge badge-soft-success  my-1  me-2">
                Angular Developer
              </span>
            </td>
            <td>Design</td>
            <td>21 Feb, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <span className="contact-star">
                  <span className="feather-icon">
                    <i data-feather="star"></i>
                  </span>
                </span>
              </div>
            </td>
            <td>
              <div className="media align-items-center">
                <div className="media-head me-2">
                  <div className="avatar avatar-xs avatar-soft-danger avatar-rounded">
                    <span className="initial-wrap">J</span>
                  </div>
                </div>
                <div className="media-body">
                  <span className="d-block text-high-em">John Brother</span>
                </div>
              </div>
            </td>
            <td className="text-truncate">john@cryodrakon.info</td>
            <td>+456 52 4862</td>
            <td>
              <span className="badge badge-soft-violet my-1  me-2">
                Promotion
              </span>
              <span className="badge badge-soft-danger  my-1  me-2">
                Collaborator
              </span>
            </td>
            <td>Human Resource</td>
            <td>14 Jan, 2019</td>
            <td>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Archive"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="archive"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Edit"
                    href="edit-contact.html"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="edit"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover del-button"
                    data-bs-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-bs-original-title="Delete"
                    href="/"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="trash"></i>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="icon">
                      <span className="feather-icon">
                        <i data-feather="more-vertical"></i>
                      </span>
                    </span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="edit-contact.html">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="edit"></i>
                      </span>
                      <span>Edit Contact</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="trash-2"></i>
                      </span>
                      <span>Delete</span>
                    </a>
                    <a className="dropdown-item" href="/">
                      <span className="feather-icon dropdown-icon">
                        <i data-feather="copy"></i>
                      </span>
                      <span>Duplicate</span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header dropdown-header-bold">
                      Change Labels
                    </h6>
                    <a className="dropdown-item" href="/">
                      Design
                    </a>
                    <a className="dropdown-item" href="/">
                      Developer
                    </a>
                    <a className="dropdown-item" href="/">
                      Inventory
                    </a>
                    <a className="dropdown-item" href="/">
                      Human Resource
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
