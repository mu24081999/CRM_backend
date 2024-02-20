import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateContactRec } from "../../../redux/services/contact";
import TagInput from "../../../components/FormFields/reactTagInputComponent";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactColorInput from "../../../components/FormFields/reactColorInput";

const ContactProfile = ({ contact }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (contact) {
      setValue("firstname", contact.firstname);
      setValue("lastname", contact.lastname);
      setValue("phone", contact.phone);
      setValue("email", contact.email);
      setValue("biography", contact.biography);
      // setValue("contact_id", contact.id);
    }
  }, [contact, setValue]);
  const handleUpdateContact = (data) => {
    console.log("🚀 ~ handleUpdateContact ~ data:", data, token, contact.id);
    dispatch(updateContactRec(token, contact.id, data));
  };
  const handleUpdateBio = (data) => {
    dispatch(updateContactRec(token, contact.id, data));
  };
  return (
    <>
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
              <form onSubmit={handleSubmit(handleUpdateContact)}>
                <div className="row gx-3">
                  {/* <div className="col-sm-6">
                    <ReactColorInput
                      name="color"
                      label="First Name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div> */}
                  <div className="col-sm-6">
                    <InputField
                      name="firstname"
                      placeholder="Enter your First Name"
                      label="First Name"
                      defaultValue={contact?.firstname}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      name="lastname"
                      placeholder="Enter your Last Name"
                      label="Last Name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <InputField
                      name="email"
                      placeholder="Enter your email identity"
                      label="Email Id"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      name="phone"
                      placeholder="Enter your phone number"
                      label="Phone Number"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* <div className="col-sm-6">
                  <TagInput
                    name="tags"
                    placeholder="Enter your phone number"
                    label="Phone Number"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                    errors={errors}
                  />
                </div> */}
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
                <div className="modal-footer align-items-center">
                  <button
                    data-bs-dismiss="modal"
                    type="button"
                    className="btn btn-secondary"
                  >
                    Discard
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- More Info --> */}
      <div
        className="modal fade"
        id="moreContact"
        tabindex="-1"
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
                    <InputField
                      name="firstname"
                      placeholder="Enter your First Name"
                      label="Name"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                  <div className="col-sm-6">
                    <InputField
                      name="lastname"
                      placeholder="Enter your Last Name"
                      label="Lastname"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Field required!",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <input
                        className="form-control"
                        type="email"
                        value="contct@hencework.com"
                        placeholder="Email Id"
                        name="emailid1"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="form-label">Birthday</label>
                      <input
                        className="form-control"
                        type="text"
                        value="10/24/1984"
                        placeholder="Phone No"
                        name="birthday1"
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
      {/* <!-- /More Info --> */}

      {/* <!-- Add Bio --> */}
      <div
        className="modal fade"
        id="tagsInput"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Tags</h6>
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
                  <div className="col-sm-12">
                    <div className="form-group">
                      <select
                        id="input_tags"
                        className="form-control"
                        multiple="multiple"
                      >
                        <option selected="selected">Collaborator</option>
                        <option>Designer</option>
                        <option selected="selected">React Developer</option>
                      </select>
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
      {/* <!-- /Tags --> */}

      {/* <!-- Add Bio --> */}
      <div
        className="modal fade"
        id="addBio"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Biography</h6>
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
              <form onSubmit={handleSubmit(handleUpdateBio)}>
                <div className="row gx-3">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <TextAreaField
                        control={control}
                        errors={errors}
                        name="biography"
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer align-items-center">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-secondary"
                  >
                    Discard
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Add Bio --> */}
    </>
  );
};

export default ContactProfile;
