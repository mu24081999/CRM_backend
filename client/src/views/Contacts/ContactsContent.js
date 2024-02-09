import React from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import Table from "../../components/Table/Table";

const ContactsContent = () => {
  const columns = [
    { name: "Name" },
    { name: "Email Address" },
    { name: "Phone" },
    { name: "Tags" },
    { name: "Labels" },
    { name: "Date Created" },
    { name: "Actions" },
  ];
  const rows = [
    { type: "user", imgUrl: "https://google.com", name: "Morgan Freeman" },
    { type: "email", email: "morgan@jampack.com	" },
    { type: "text", email: "+145 52 5689" },
    {
      type: "tags",
      tags: [
        { name: "Promotion", variant: "primary" },
        { name: "Collaborator", variant: "danger" },
      ],
    },
    { type: "text", email: "13 Jan, 2020" },
  ];
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            <Sidebar />

            <div className="contactapp-detail-wrap">
              <Header />
              <div className="contact-body">
                <div data-simplebar className="nicescroll-bar">
                  <div className="collapse" id="collapseQuick">
                    <div className="quick-access-form-wrap">
                      <form className="quick-access-form border">
                        <div className="row gx-3">
                          <div className="col-xxl-10">
                            <div className="position-relative">
                              <div className="dropify-square">
                                <input type="file" className="dropify-1" />
                              </div>
                              <div className="col-md-12">
                                <div className="row gx-3">
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        placeholder="First name*"
                                        value=""
                                        type="text"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        placeholder="Last name*"
                                        value=""
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        placeholder="Email Id*"
                                        value=""
                                        type="text"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        placeholder="Phone"
                                        value=""
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-4">
                                    <div className="form-group">
                                      <input
                                        className="form-control"
                                        placeholder="Department"
                                        value=""
                                        type="text"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <select
                                        id="input_tags"
                                        className="form-control"
                                        multiple="multiple"
                                      >
                                        <option selected="selected">
                                          Collaborator
                                        </option>
                                        <option>Designer</option>
                                        <option selected="selected">
                                          Developer
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xxl-2">
                            <div className="form-group">
                              <button
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                className="btn btn-block btn-primary "
                              >
                                Create New
                              </button>
                            </div>
                            <div className="form-group">
                              <button
                                data-bs-toggle="collapse"
                                disabled
                                data-bs-target="#collapseExample"
                                aria-expanded="false"
                                className="btn btn-block btn-secondary"
                              >
                                Discard
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <Table columns={columns} rows={rows} />
                  <ContactList />
                </div>
              </div>
            </div>
            {/* <!-- Edit Info --> */}
            <div
              id="add_new_contact"
              className="modal fade add-new-contact"
              tabIndex="-1"
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
                              <option selected="selected">
                                React Developer
                              </option>
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
          </div>
        </div>
      </div>
      {/* <!-- /Page Body --> */}
    </div>
  );
};

export default ContactsContent;
