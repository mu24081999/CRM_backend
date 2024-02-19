import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../../components/FormFields/reactSelectField";
import { FaClipboard, FaEdit, FaMinus, FaTrash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiMinimize1 } from "react-icons/ci";
import { CgMaximize } from "react-icons/cg";
import InputField from "../../../../components/FormFields/InputField";
import TextAreaField from "../../../../components/FormFields/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";
import { sendEmailRec } from "../../../../redux/services/email";

const ComposeEmail = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // if (token) {
    dispatch(getUsers(token));
    // }
  }, [token, dispatch]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersData(users);
    }
  }, [users]);
  const handleFileChange = (e) => {
    setValue("files", e.currentTarget.files);
  };
  const handleSendEmail = (data) => {
    // const formData = {
    //   ...data,
    //   from: user.email,
    //   type: "email",
    //   files: data.files,
    // };
    const formData = new FormData();

    // Append other form fields
    formData.append("subject", "Contact");
    formData.append("body", data.body);
    formData.append("type", "email");
    formData.append("from", user.email);
    data.to.forEach((element) => {
      formData.append("to", element.email);
    });
    data.files &&
      data.files.forEach((element) => {
        formData.append("files", element);
      });

    console.log("🚀 ~ handleSendEmail ~ formData:", formData);

    dispatch(sendEmailRec(token, formData));
  };
  return (
    <div class="compose-email-popup">
      <div class="d-flex flex-column h-100">
        <header class="d-flex align-items-center justify-content-between">
          <h6 class="text-white mb-0">Compose Email</h6>
          <div class="d-flex">
            <button
              id="min_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  {/* <i data-feather="minus"></i> */}
                  <FaMinus />
                </span>
              </span>
            </button>
            <button
              id="max_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded d-lg-block d-none"
            >
              <span class="icon">
                <span class="feather-icon">
                  {/* <i data-feather="maximize-2"></i> */}
                  <CgMaximize />
                </span>
                <span class="feather-icon">
                  {/* <i data-feather="minimize-2"></i> */}
                  <CiMinimize1 />
                </span>
              </span>
            </button>
            <button
              id="close_compose_popup"
              class="btn btn-sm btn-icon btn-dark btn-rounded"
            >
              <span class="icon">
                <span class="feather-icon">
                  {/* <i data-feather="x"></i> */}
                  <RxCross2 />
                </span>
              </span>
            </button>
          </div>
        </header>
        <form onSubmit={handleSubmit(handleSendEmail)}>
          <div className="w-100 mb-1">
            <InputField
              name="subject"
              placeholder="Subject"
              control={control}
              errors={errors}
            />
          </div>
          <div className="w-100 mb-1">
            <ReactSelectField
              name="to"
              placeholder="Select"
              control={control}
              isMulti={true}
              optionData={
                usersData.length > 0
                  ? usersData?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.email,
                        ...user,
                      };
                    })
                  : []
              }
              errors={errors}
            />
          </div>
          <div className="w-100 mb-1">
            <TextAreaField
              name="body"
              placeholder="Text"
              control={control}
              errors={errors}
            />
          </div>
          <div class="compose-email-footer">
            <div>
              <button class="btn btn-primary me-2" type="submit">
                Send
              </button>
              <input
                type="file"
                name="file"
                multiple
                onChange={handleFileChange}
              />
              <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                <span
                  class="icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Add flag"
                  data-bs-original-title="Add flag"
                >
                  <span class="feather-icon">
                    {/* <i data-feather="paperclip"></i> */}
                    <FaClipboard />
                  </span>
                </span>
              </button>
            </div>
            <div>
              <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                <span
                  class="icon"
                  data-bs-toggle="Save Draft"
                  data-bs-placement="top"
                  title="Save Draft"
                  data-bs-original-title="Save Draft"
                >
                  <span class="feather-icon">
                    {/* <i data-feather="edit"></i> */}
                    <FaEdit />
                  </span>
                </span>
              </button>
              <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                <span
                  class="icon"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                  data-bs-original-title="Delete"
                >
                  <span class="feather-icon">
                    {/* <i data-feather="trash-2"></i> */}
                    <FaTrash />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;
