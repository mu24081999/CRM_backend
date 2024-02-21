import React, { useEffect, useState } from "react";
import Sidebar from "./components/SidebarContact";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContactList from "./components/AddContactList";
import { useSelector } from "react-redux";
import ContactDetails from "./components/ContactDetails";

const ContactsContent = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  console.log("🚀 ~ ContactsContent ~ isEdit:", isEdit);
  const { contacts } = useSelector((state) => state.contact);
  useEffect(() => {
    if (contacts.length > 0) {
      const filterData = contacts.filter(
        (contact) => contact.status !== "blocked"
      );
      setData(filterData);
    }
  }, [contacts]);
  const handleReceiveData = (receivedData) => {
    setData(receivedData);
  };
  const handleToggleEdit = (value) => {
    setIsEdit(value);
  };
  return (
    <div className="hk-pg-wrapper pb-0">
      {/* <!-- Page Body --> */}
      <div className="hk-pg-body py-0">
        <div className="contactapp-wrap">
          <div className="contactapp-content">
            <Sidebar
              onSendData={handleReceiveData}
              contactsData={contacts}
              onToggleEdit={handleToggleEdit}
            />
            {isEdit && <ContactDetails isEdit={isEdit} />}

            {!isEdit && (
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

                    <ContactList
                      contactsData={data}
                      onToggleEdit={handleToggleEdit}
                      isEdit={isEdit}
                    />
                  </div>
                </div>
              </div>
            )}

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
                    <AddContactList />
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
