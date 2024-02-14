import React from "react";

const ContactProfile = ({ contactDetails }) => {
  return (
    <div
      className="modal fade"
      id="editInfo"
      //   tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">Profile Information</h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row gx-3">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value="Mandaline"
                      placeholder="First Name"
                      name="name"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value="Shane"
                      placeholder="Last Name"
                      name="lastname"
                    />
                  </div>
                </div>
              </div>
              <div className="row gx-3">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label">Email ID</label>
                    <input
                      className="form-control"
                      type="email"
                      value="contct@hencework.com"
                      placeholder="Email Id"
                      name="emailid"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      value="+91-25-4125-2365"
                      placeholder="Phone No"
                      name="phone"
                    />
                  </div>
                </div>
              </div>
              <div className="row gx-3">
                <div className="col-sm-12">
                  <label className="form-label">Location</label>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      value="Lane 1"
                      placeholder="Line 1"
                      name="add1"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      value="Newyork"
                      placeholder="Line 2"
                      name="add2"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer align-items-center">
            <button type="button" className="btn btn-secondary">
              Discard
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactProfile;
