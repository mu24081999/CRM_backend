import React from "react";
import { useSelector } from "react-redux";
import ContactProfile from "./ContactProfile";
import { FaMailBulk, FaPhone, FaVideo } from "react-icons/fa";
import InputField from "../../../components/FormFields/InputField";
import { useForm } from "react-hook-form";

const ContactDetails = ({ isEdit }) => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const { contactDetails } = useSelector((state) => state.contact);

  return (
    <>
      <div className="contactapp-detail-wrap">
        <header className="contact-header">
          <div className="d-flex align-items-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb  mb-0">
                <li className="breadcrumb-item">
                  <a href="contact.html">Contacts</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Morgan Freeman
                </li>
              </ol>
            </nav>
          </div>
          <div className="contact-options-wrap">
            <div className="d-flex fs-7 align-items-center">1 of 30</div>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Previous"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-left"></i>
                </span>
              </span>
            </a>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Next"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-right"></i>
                </span>
              </span>
            </a>
            <a
              className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Collapse"
            >
              <span className="icon">
                <span className="feather-icon">
                  <i data-feather="chevron-up"></i>
                </span>
                <span className="feather-icon d-none">
                  <i data-feather="chevron-down"></i>
                </span>
              </span>
            </a>
          </div>
          <div className="hk-sidebar-togglable"></div>
        </header>

        <div className="contact-body contact-detail-body">
          <div data-simplebar className="nicescroll-bar">
            <div className="d-flex flex-xxl-nowrap flex-wrap">
              <div className="contact-info w-xxl-30 w-100">
                <div className="dropdown action-btn">
                  <button
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    className="btn btn-light dropdown-toggle "
                    type="button"
                  >
                    Action
                  </button>
                  <div role="menu" className="dropdown-menu">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/">
                      Separated link
                    </a>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <div className="dropify-circle edit-img">
                    {/* <input
                          type="file"
                          className="dropify-1"
                          data-default-file="dist/img/avatar2.jpg"
                        /> */}
                    <img
                      src={contactDetails?.avatar}
                      alt={contactDetails?.firstname}
                      className="dropify-1"
                      width={100}
                    />
                  </div>
                  <div className="cp-name text-truncate mt-3">
                    {/* Mendaline Shane */}
                    {contactDetails?.firstname} {contactDetails?.lastname}
                  </div>
                  <p>No phone calls Always busy</p>

                  <div
                    className="rating rating-yellow my-rating-4"
                    data-rating="3"
                  ></div>
                  <ul className="hk-list hk-list-sm justify-content-center mt-2">
                    <li>
                      <a
                        className="btn btn-icon btn-soft-primary btn-rounded"
                        href="/"
                      >
                        <span className="icon">
                          <span className="feather-icon">
                            {/* <i data-feather="mail"></i> */}
                            <FaMailBulk />
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn-icon btn-soft-success btn-rounded"
                        href="/"
                      >
                        <span className="icon">
                          <span className="feather-icon">
                            {/* <i data-feather="phone"></i> */}
                            <FaPhone />
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="btn btn-icon btn-soft-danger btn-rounded"
                        href="/"
                      >
                        <span className="icon">
                          <span className="feather-icon">
                            {/* <i data-feather="video"></i> */}
                            <FaVideo />
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Profile Information</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Edit"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#editInfo"
                      >
                        <span className="feather-icon">
                          <i data-feather="edit-2"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    <ul className="cp-info">
                      <li>
                        <span>First name</span>
                        <span>{contactDetails?.firstname}</span>
                      </li>
                      <li>
                        <span>Last name</span>
                        <span>{contactDetails?.lastname}</span>
                      </li>
                      <li>
                        <span>Email</span>
                        <span>{contactDetails?.email}</span>
                      </li>
                      <li>
                        <span>Phone</span>
                        <span>+{contactDetails?.phone}</span>
                      </li>
                      <li>
                        <span>Location</span>
                        <span>Newyork</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">More Info</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Edit"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#moreContact"
                      >
                        <span className="feather-icon">
                          <i data-feather="edit-2"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    <ul className="cp-info">
                      <li>
                        <span>Designation</span>
                        <span>{contactDetails?.designation}</span>
                      </li>
                      <li>
                        <span>Company</span>
                        <span>{contactDetails?.company_name}</span>
                      </li>
                      <li>
                        <span>Language</span>
                        <span>morgan@flights.com</span>
                      </li>
                      <li>
                        <span>Birthday</span>
                        <span>-</span>
                      </li>
                      <li>
                        <span>Location</span>
                        <span>Newyork</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Tags</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Add Tags"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#tagsInput"
                      >
                        <span className="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    {contactDetails?.tags?.map((tag, index) => (
                      <span key={index} className="badge badge-soft-violet">
                        {tag.name}
                      </span>
                    ))}

                    <span className="badge badge-soft-danger">
                      React Developer
                    </span>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Social Profile</a>
                  </div>
                  <div className="card-body">
                    <ul className="hk-list hk-list-sm">
                      <li>
                        <button className="btn btn-icon btn-rounded btn-primary">
                          <span className="icon">
                            <i className="fab fa-behance"></i>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-icon btn-rounded btn-warning">
                          <span className="icon">
                            <i className="fab fa-google-drive"></i>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-icon btn-rounded btn-info">
                          <span className="icon">
                            <i className="fab fa-dropbox"></i>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="btn btn-icon btn-rounded btn-dark">
                          <span className="icon">
                            <i className="fab fa-github"></i>
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Biography</a>
                    <button
                      className="btn btn-xs btn-icon btn-rounded btn-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      data-bs-original-title="Edit"
                    >
                      <span
                        className="icon"
                        data-bs-toggle="modal"
                        data-bs-target="#addBio"
                      >
                        <span className="feather-icon">
                          <i data-feather="edit-2"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                  <div className="card-body">
                    <p>{contactDetails?.biography}.</p>
                  </div>
                </div>
                <div className="separator-full"></div>
                <div className="card">
                  <div className="card-header">
                    <a href="/">Settings</a>
                  </div>
                  <div className="card-body">
                    <ul className="cp-action">
                      <li>
                        <a href="/">
                          <span className="cp-icon-wrap">
                            <span className="feather-icon">
                              <i data-feather="upload"></i>
                            </span>
                          </span>
                          Share Contact
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <span className="cp-icon-wrap">
                            <span className="feather-icon">
                              <i data-feather="heart"></i>
                            </span>
                          </span>
                          Add to Favourites
                        </a>
                      </li>
                      <li>
                        <a href="/" className="link-danger">
                          <span className="cp-icon-wrap">
                            <span className="feather-icon">
                              <i data-feather="trash"></i>
                            </span>
                          </span>
                          Delete Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="contact-more-info">
                <ul className="nav nav-tabs nav-line nav-icon nav-light">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#tab_summery"
                    >
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="zap"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Summery</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="activity"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Activity</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="edit-3"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Notes</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="mail"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Email</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="phone"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Calls</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="check-square"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Tasks</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="clock"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Schedule</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="/">
                      <span className="nav-icon-wrap">
                        <span className="feather-icon">
                          <i data-feather="shield"></i>
                        </span>
                      </span>
                      <span className="nav-link-text">Sales</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content mt-7">
                  <div className="tab-pane fade show active" id="tab_summery">
                    <form>
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <div className="form-label-group">
                            <label>Write a Note</label>
                            <small className="text-muted">1200</small>
                          </div>
                          <textarea
                            className="form-control"
                            rows="8"
                            placeholder="Write an internal note"
                          ></textarea>
                        </div>
                      </div>
                      <button className="btn btn-outline-light mt-2">
                        Add Note
                      </button>
                    </form>
                  </div>
                </div>
                <div className="pipeline-status-wrap mt-7">
                  <div className="title-lg mb-3">Lead Pipeline Status</div>
                  <ul className="pipeline-stutus">
                    <li className="completed">
                      <span>In Pipeline</span>
                    </li>
                    <li className="active">
                      <span>Follow Up</span>
                    </li>
                    <li>
                      <span>Scheduled Service</span>
                    </li>
                    <li>
                      <span>Conversation</span>
                    </li>
                    <li>
                      <span>Win/Lost</span>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div className="activity-wrap mt-7">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="title-lg mb-0">Activity</div>
                    <select className="form-select mw-150p">
                      <option selected="">All Activity</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="title-sm text-primary mb-3">June 24</div>
                  <ul className="activity-thread">
                    <li>
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-icon avatar-sm avatar-primary avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="mail"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="activity-text">
                              You sent{" "}
                              <span className="text-dark text-capitalize">
                                1 message
                              </span>{" "}
                              to the contact.
                            </div>
                            <div className="activity-time">10.00 pm</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                            <span className="initial-wrap">M</span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="activity-text">
                              <span className="text-dark text-capitalize">
                                Morgan Freeman
                              </span>{" "}
                              as it is sometimes known, is dummy text used in
                              laying out print, graphic or web designs. The
                              passage is attributed to an unknown typesetter in
                              the 15th century who is thought to have scrambled.
                            </div>
                            <div className="activity-time">10.00 pm</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar  avatar-icon avatar-sm avatar-info avatar-rounded">
                            <span className="initial-wrap">
                              <span className="feather-icon">
                                <i data-feather="shield"></i>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="activity-text">
                              Your deal value{" "}
                              <span className="text-dark">$208.15</span> is paid
                              through PayU Money online on{" "}
                              <span className="text-dark">02.12.18</span> at{" "}
                              <span className="text-dark">15:30, Monday</span>
                            </div>
                            <div className="activity-time">10.00 pm</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="title-sm text-primary mt-5 mb-3">June 25</div>
                  <ul className="activity-thread">
                    <li>
                      <div className="media">
                        <div className="media-head">
                          <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                            <span className="initial-wrap">M</span>
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="activity-text">
                              <span className="text-dark">Morgan Freeman</span>{" "}
                              responded to your appointment schedule question.{" "}
                            </div>
                            <div className="activity-time">10.00 pm</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactProfile contact={contactDetails} />

      {/* <!-- Edit Info --> */}
      <div
        id="add_new_contact"
        className="modal fade add-new-contact"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h5 className="mb-5">Create New Conatct</h5>
              <form>
                <div className="row gx-3">
                  <div className="col-sm-2 form-group">
                    <div className="dropify-square">
                      <input type="file" className="dropify-1" />
                    </div>
                  </div>
                  <div className="col-sm-10 form-group">
                    <textarea
                      className="form-control mnh-100p"
                      rows="4"
                      placeholder="Add Biography"
                    ></textarea>
                  </div>
                </div>
                <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                  <span>Basic Info</span>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">Middle Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Email ID</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <select className="form-select">
                        <option selected="">--</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select className="form-select">
                        <option selected="">--</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-label">Country</label>
                      <select className="form-select">
                        <option selected="">--</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                  <span>Company Info</span>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Designation</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Website</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Work Phone</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
                  <span>Additional Info</span>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="form-label">Tags</label>
                      <select
                        id="input_tags_2"
                        className="form-control"
                        multiple="multiple"
                      ></select>
                      <small className="form-text text-muted">
                        You can add upto 4 tags per contact
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Facebook"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Twitter"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="LinkedIn"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Gmail"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer align-items-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Discard
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Create Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Edit Info --> */}

      {/* <!-- Add Label --> */}
      <div
        id="add_new_label"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h6 className="text-uppercase fw-bold mb-3">Add Label</h6>
              <form>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Label Name"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  data-bs-dismiss="modal"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add Label --> */}

      {/* <!-- Add Tag --> */}
      <div
        id="add_new_tag"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h6 className="text-uppercase fw-bold mb-3">Add Tag</h6>
              <form>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <select
                        id="input_tags_3"
                        className="form-control"
                        multiple="multiple"
                      >
                        <option selected="selected">Collaborator</option>
                        <option selected="selected">Designer</option>
                        <option selected="selected">React Developer</option>
                        <option selected="selected">Promotion</option>
                        <option selected="selected">Advertisement</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  data-bs-dismiss="modal"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add Tag --> */}
    </>
  );
};

export default ContactDetails;
