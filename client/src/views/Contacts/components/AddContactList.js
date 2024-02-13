import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField";
import TextAreaField from "../../../components/FormFields/textAreaField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";
import DatePickerField from "../../../components/FormFields/datePickerField";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./file.css";
import { addContact } from "../../../redux/services/contact";
const AddContactList = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { token } = useSelector((state) => state.auth);
  const countryWatcher = watch("country_array");
  const stateWatcher = watch("state_array");
  const cityWatcher = watch("city_array");
  const dispatch = useDispatch();
  useEffect(() => {
    if (countryWatcher !== undefined) {
      setValue("country", countryWatcher.value);
    }
  }, [countryWatcher, setValue]);
  useEffect(() => {
    if (stateWatcher !== undefined) {
      setValue("state", stateWatcher.value);
    }
  }, [stateWatcher, setValue]);
  useEffect(() => {
    if (cityWatcher !== undefined) {
      setValue("city", cityWatcher.value);
    }
  }, [cityWatcher, setValue]);
  const handleAddContact = (data) => {
    const formData = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      biography: data.biography,
      phone: data.phone,
      file: data.file,
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      company_name: data.company_name,
      designation: data.designation,
      website: data.website,
      work_phone: data.work_phone,
      tags: JSON.stringify([
        {
          name: "Collaborator",
        },
      ]),

      social_links: JSON.stringify([
        {
          name: "facebook",
          link: data?.facebook,
        },
        {
          name: "linkedin",
          link: data?.linkedin,
        },
        {
          name: "gmail",
          link: data?.gmail,
        },
        {
          name: "twitter",
          link: data?.twitter,
        },
      ]),
    };
    console.log("🚀 ~ handleAddContact ~ data:", data.file);
    dispatch(addContact(token, formData));
  };
  const handleChangeImage = (e) => {
    setValue("file", e.currentTarget.files[0]);
    console.log("🚀 ~ handleChangeImage ~ e:", e.currentTarget.files[0]);
  };
  return (
    <form onSubmit={handleSubmit(handleAddContact)}>
      <div className="row gx-3">
        <div className="col-sm-2 form-group">
          {/* <div className="dropify-square">
            <input type="file" className="dropify-1" />
          </div> */}
          <div class="frame">
            <div class="center">
              <div class="dropzone">
                <img
                  src="http://100dayscss.com/codepen/upload.svg"
                  class="upload-icon"
                />
                <p className=" fs-5 fw-bolder text-center">Upload Photo</p>

                <input
                  type="file"
                  class="upload-input"
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-10 form-group">
          {/* <textarea
            className="form-control mnh-100p"
            rows="4"
            placeholder="Add Biography"
          ></textarea> */}
          <TextAreaField
            name="biography"
            rows={5}
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
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>Basic Info</span>
      </div>
      <div className="row gx-3">
        <div className="col-sm-4">
          {/* <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="firstname"
            placeholder="Your name"
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
        </div>
        <div className="col-sm-4">
          <InputField
            name="middlename"
            placeholder="Your middlename"
            label="Middle Name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            errors={errors}
          />
          {/* <div className="form-group">
            <label className="form-label">Middle Name</label>
            <input className="form-control" type="text" />
          </div> */}
        </div>
        <div className="col-sm-4">
          {/* <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="lastname"
            placeholder="Your lastname"
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
          {/* <div className="form-group">
            <label className="form-label">Email ID</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="email"
            type="email"
            placeholder="example@example.com"
            label="Email"
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
          {/* <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="phone"
            placeholder="Your phone number"
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
      <div className="row gx-3">
        <div className="col-sm-4">
          {/* <div className="form-group">
            <label className="form-label">City</label>
            <select className="form-select">
              <option selected="">--</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div> */}
          <ReactSelectField
            name="city_array"
            placeholder="Select your city"
            label="City"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            options={[
              {
                label: "Downtown",
                value: "downtown",
              },
            ]}
            errors={errors}
          />
        </div>
        <div className="col-sm-4">
          {/* <div className="form-group">
            <label className="form-label">State</label>
            <select className="form-select">
              <option selected="">--</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div> */}
          <ReactSelectField
            name="state_array"
            placeholder="Select your state"
            label="State"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            options={[
              {
                label: "Downtown",
                value: "downtown",
              },
            ]}
            errors={errors}
          />
        </div>
        <div className="col-sm-4">
          {/* <div className="form-group">
            <label className="form-label">Country</label>
            <select className="form-select">
              <option selected="">--</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div> */}
          <ReactSelectField
            name="country_array"
            placeholder="Select your country"
            label="Country"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Field required!",
              },
            }}
            options={[
              {
                label: "USA",
                value: "USA",
              },
            ]}
            errors={errors}
          />
        </div>
      </div>
      <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
        <span>Company Info</span>
      </div>
      <div className="row gx-3">
        <div className="col-sm-6">
          {/* <div className="form-group">
            <label className="form-label">Company Name</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="company_name"
            placeholder="Company Name"
            label="Company Name"
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
          {/* <div className="form-group">
            <label className="form-label">Designation</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="designation"
            placeholder="Your designation "
            label="Desgnation"
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
          {/* <div className="form-group">
            <label className="form-label">Website</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="website"
            placeholder="Your website link"
            label="Website"
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
          {/* <div className="form-group">
            <label className="form-label">Work Phone</label>
            <input className="form-control" type="text" />
          </div> */}
          <InputField
            name="work_phone"
            placeholder="Your work phone number"
            label="Work Phone Number"
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
          {/* <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Facebook"
            />
          </div> */}
          <InputField
            name="facebook"
            placeholder="Your facebook"
            label="Facebook"
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
          {/* <div className="form-group">
            <input className="form-control" type="text" placeholder="Twitter" />
          </div> */}
          <InputField
            name="twitter"
            placeholder="Your twitter"
            label="Twitter"
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
          {/* <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="LinkedIn"
            />
          </div> */}
          <InputField
            name="linkedin"
            placeholder="Your linkedin"
            label="LinkedIn"
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
          {/* <div className="form-group">
            <input className="form-control" type="text" placeholder="Gmail" />
          </div> */}
          <InputField
            name="gmail"
            placeholder="Your gmail"
            label="Gmail"
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
      <div className="modal-footer align-items-center">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Discard
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          // data-bs-dismiss="modal"
        >
          Create Contact
        </button>
      </div>
    </form>
  );
};

export default AddContactList;
