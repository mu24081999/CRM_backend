import React from "react";

const Table = ({ columns, rows }) => {
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
            {columns?.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <span className="contact-star marked">
                    <span className="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                </div>
              </td>
              {row.type === "user" && (
                <td>
                  <div className="media align-items-center">
                    <div className="media-head me-2">
                      <div className="avatar avatar-xs avatar-rounded">
                        <img
                          src={row.imgUrl}
                          alt={row.name}
                          className="avatar-img"
                        />
                      </div>
                    </div>
                    <div className="media-body">
                      <span className="d-block text-high-em">{row.name}</span>
                    </div>
                  </div>
                </td>
              )}
              {row.type === "email" && (
                <td className="text-truncate">{row.email}</td>
              )}
              {row.type === "text" && <td>{row.name}</td>}
              {row.type === "tags" &&
                row?.tags?.length > 0 &&
                row?.tags?.map((tag, index) => (
                  <td key={index}>
                    <span
                      className={`badge badge-soft-${tag.variant} my-1  me-2`}
                    >
                      {tag?.name}
                    </span>
                  </td>
                ))}

              {/* <td>Design</td>
              <td>13 Jan, 2020</td> */}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
