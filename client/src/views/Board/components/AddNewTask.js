import React from "react";
import InputField from "../../../components/FormFields/InputField";
import ReactSelectField from "../../../components/FormFields/reactSelectField";

import TagInput from "../../../components/FormFields/reactTagInputComponent";
import { useForm } from "react-hook-form";
import ReactColorInput from "../../../components/FormFields/reactColorInput";
import FileField from "../../../components/FormFields/fileField";
import { useDispatch, useSelector } from "react-redux";
import { storeBoard } from "../../../redux/services/board";

const AddNewTask = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const handleAddBoard = (data) => {
    console.log("🚀 ~ handleAddBoard ~ data:", data);
    const newData = {
      name: data.name,
      image: data.image,
      visibility: data.visibility.value,
      avatar_text: data.avatar_text.value,
      avatar_color: data.avatar_color,
    };
    const formData = new FormData();
    formData.append("name", newData.name);
    formData.append("image", newData.image);
    formData.append("visibility", newData.visibility);
    formData.append("avatar_text", newData.avatar_text);
    formData.append("avatar_color", newData.avatar_color);

    dispatch(storeBoard(token, formData));
    reset();
    return {};
  };
  return (
    <div
      id="add_new_board"
      className="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
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
            <h5>Add New Board</h5>
            <p className="mb-4">
              You are granted limited license only for purposes of viewing the
              material contained on this Website.
            </p>
            <form onSubmit={handleSubmit(handleAddBoard)}>
              <div className="row gx-3">
                <div className="col-sm-12">
                  {/* <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-control task-name" type="text" />
                  </div> */}
                  <InputField
                    name="name"
                    placeholder="Enter task name"
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
                  <ReactColorInput
                    name="avatar_color"
                    label="Avatar Color"
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
                <div className="col-sm-12">
                  {/* <div className="form-group">
                    <label className="form-label">Visibility</label>
                    <select className="form-control form-select">
                      <option selected="">Public</option>
                      <option value="1">Private</option>
                    </select>
                    <small className="form-text text-muted">
                      Public setting will be seen by everybody with login
                      details.
                    </small>
                  </div> */}
                  <ReactSelectField
                    name="visibility"
                    placeholder="Visibility"
                    label="Visibility"
                    control={control}
                    options={[
                      { label: "Public", value: "public" },
                      { label: "Private", value: "private" },
                    ]}
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
              <div className="col-sm-12">
                {/* <div className="form-group">
                    <label className="form-label">Avatar</label>
                    <select className="form-control form-select">
                      <option selected="">Choose Avatar-Text</option>
                      <option value="1">A</option>
                    </select>
                  </div> */}
                <ReactSelectField
                  name="avatar_text"
                  label="Avatar Text"
                  control={control}
                  options={[
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" },
                    { label: "D", value: "D" },
                    { label: "E", value: "E" },
                    { label: "F", value: "F" },
                    { label: "G", value: "G" },
                    { label: "H", value: "H" },
                    { label: "I", value: "I" },
                    { label: "J", value: "J" },
                    { label: "K", value: "K" },
                    { label: "L", value: "L" },
                    { label: "M", value: "M" },
                    { label: "N", value: "N" },
                    { label: "O", value: "O" },
                    { label: "O", value: "O" },
                    { label: "P", value: "P" },
                    { label: "Q", value: "Q" },
                    { label: "R", value: "R" },
                    { label: "S", value: "S" },
                    { label: "T", value: "T" },
                    { label: "U", value: "U" },
                    { label: "V", value: "V" },
                    { label: "W", value: "W" },
                    { label: "X", value: "X" },
                    { label: "Y", value: "Y" },
                    { label: "Z", value: "Z" },
                  ]}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                  errors={errors}
                />
              </div>
              <div className="col-sm-12">
                {/* <div className="form-group">
                    <label className="form-label">Avatar Color</label>
                    <div className="input-group color-picker">
                      <div className="input-group-text colorpicker-input-addon">
                        <input type="color" />
                      </div>
                      <input
                        type="text"
                        className="form-control colorpicker-value"
                        value="#009B84"
                      />
                    </div>
                  </div> */}

                <div className="col-sm-12">
                  {/* <div className="form-group">
                    <div className="dropify-square">
                      <input type="file" className="dropify-1" />
                    </div>
                  </div> */}
                  <FileField
                    control={control}
                    errors={errors}
                    multiple={false}
                    name="image"
                    type="file"
                    rules={{
                      required: {
                        value: true,
                        message: "Field required!",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer align-items-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
