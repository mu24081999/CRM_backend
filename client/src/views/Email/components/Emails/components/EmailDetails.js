import moment from "moment";
import React from "react";
import FilePreview from "../../../../../components/FilePreview/FilePreview";
import {
  FaArrowDown,
  FaArrowLeft,
  FaClipboard,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import InputField from "../../../../../components/FormFields/InputField";
import ReactSelectField from "../../../../../components/FormFields/reactSelectField";
import TextAreaField from "../../../../../components/FormFields/textAreaField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailRec } from "../../../../../redux/services/email";

const EmailDetails = ({ emailDetails, emailsData, emails, onEmailDetail }) => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function getFileExtension(filename) {
    // const resp = filename?.split(".").pop().toLowerCase();
    // Method 1: Using string split
    const filename1 = filename?.split("/").pop(); // Extracts the last segment after splitting by '/'
    const extension1 = filename1.split(".").pop(); // Extracts the file extension after splitting by '.'

    console.log(extension1); // Outputs: jpeg

    // Method 2: Using regular expression
    const filename2 = filename?.match(/\/([^\/?#]+)[^\/]*$/)[1]; // Extracts the last segment using regex
    const extension2 = filename2.split(".").pop(); // Extracts the file extension after splitting by '.'
    console.log(extension2); // Outputs: jpeg

    return extension2; // Outputs: jpeg
  }
  const downloadFile = async (file_link, file_name) => {
    try {
      const link = document.createElement("a");
      link.href = file_link;
      link.setAttribute("download", file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }
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
    formData.append("type", "reply");
    formData.append("from", user.email);
    formData.append("parent_id", emailDetails?.selectedEmail?.id);
    formData.append("to", data.to);
    data.files &&
      data.files.forEach((element) => {
        formData.append("files", element);
      });

    dispatch(sendEmailRec(token, formData));
    const repliesData = emails.filter(
      (email) => email.parent_id === emailDetails?.selectedEmail?.id
    );
    const selectedEmail = emailsData.filter(
      (email) => email.id === emailDetails?.selectedEmail?.id
    )[0];
    const filteredData = {
      subject: selectedEmail?.subject,
      selectedEmail: selectedEmail,
      emails: repliesData,
    };
    onEmailDetail(filteredData);
  };
  return (
    <div class="email-body">
      <div data-simplebar class="nicescroll-bar">
        <div class="single-email-subject">
          <div>
            <h4 class="fw-light">{emailDetails.subject}</h4>
            <span class="badge badge-orange badge-sm badge-pill flex-shrink-0 ms-3">
              updates
            </span>
          </div>
          <div class="email-options-wrap">
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Print"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="printer"></i>
                </span>
              </span>
            </a>
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Reply"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="corner-up-left"></i>
                </span>
              </span>
            </a>
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Forward"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="arrow-right"></i>
                </span>
              </span>
            </a>
          </div>
        </div>
        <div
          id="accordionSimpleExample"
          class="accordion accordion-simple single-email-thread"
        >
          {emailDetails.selectedEmail && (
            <div class="accordion-item">
              <div id="simple-headingOne" class="accordion-header">
                <div>
                  <div class="email-head">
                    <div
                      data-bs-toggle="collapse"
                      data-bs-target={`#simple-collapse-${emailDetails?.selectedEmail?.id}`}
                      role="button"
                      aria-expanded="false"
                    ></div>
                    <div class="media">
                      <div class="media-head">
                        <div class="avatar d-8">
                          <img
                            // src="dist/img/avatar2.jpg"
                            src={emailDetails?.selectedEmail?.sender?.avatar}
                            alt="user"
                            class="avatar-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div class="media-body">
                        <div>{emailDetails?.selectedEmail?.sender?.name}</div>
                        <div class="fs-7">
                          <span>to</span>
                          <div class="mail-desc-dropdown">
                            <a
                              href="/"
                              class="dropdown-toggle link-dark"
                              data-bs-toggle="dropdown"
                            >
                              me
                            </a>
                            <div class="dropdown-menu">
                              <div>
                                <span>from :</span>
                                <span>
                                  {emailDetails?.selectedEmail?.sender?.name}{" "}
                                  <span>
                                    &lt;
                                    {emailDetails?.selectedEmail?.sender?.email}
                                    &gt;
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span>to :</span>
                                <span>
                                  {emailDetails?.selectedEmail?.reciever?.name}{" "}
                                  <span>
                                    &lt;
                                    {
                                      emailDetails?.selectedEmail?.reciever
                                        ?.email
                                    }
                                    &gt;
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span>date :</span>
                                <span>
                                  {moment(
                                    emailDetails?.selectedEmail?.created_at,
                                    "h:mm A"
                                  ).format("h:mm A")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="email-head-action">
                      <div class="email-time">
                        {" "}
                        {moment(
                          emailDetails?.selectedEmail?.created_at,
                          "h:mm A"
                        ).format("h:mm A")}
                      </div>
                      <span class="email-star marked">
                        <span class="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <a
                        class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm"
                        href="/"
                      >
                        <span class="icon">
                          <span class="feather-icon">
                            {/* <i data-feather="corner-up-left"></i> */}
                            <FaArrowLeft />
                          </span>
                        </span>
                      </a>
                      <a
                        class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm dropdown-toggle no-caret"
                        href="/"
                        data-bs-toggle="dropdown"
                      >
                        <span class="icon">
                          <span class="feather-icon">
                            <i data-feather="more-vertical"></i>
                          </span>
                        </span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="/">
                          Forward
                        </a>
                        <a class="dropdown-item" href="/">
                          Delete
                        </a>
                        <a class="dropdown-item" href="/">
                          Report Spam
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id={`simple-collapse-${emailDetails?.selectedEmail?.id}`}
                class="accordion-collapse collapse"
              >
                <div class="accordion-body">
                  {emailDetails?.selectedEmail?.body}
                  {/* <img
                    class="d-block mt-2 mb-3"
                    src="dist/img/signature-1.png"
                    alt="signature"
                  /> */}
                  <div class="separator separator-light"></div>
                  <div class="text-end">
                    <a href="/" class="link-theme fs-7">
                      <u>Download All</u>
                    </a>
                  </div>
                  <div class="email-attachment-wrap">
                    {emailDetails?.selectedEmail?.files?.map((file, index) => (
                      <div class="attachment-box">
                        <div>
                          <div class="media">
                            <div class="avatar avatar-icon avatar-sm avatar-blue">
                              <span class="initial-wrap fs-3">
                                {/* <i class="ri-file-excel-2-fill"></i> */}
                                <FilePreview
                                  fileType={getFileExtension(file?.file_link)}
                                  fileUrl={file?.file_link}
                                  fileWidth={45}
                                />
                              </span>
                            </div>
                            <div class="media-body">
                              <p class="file-name">
                                {file?.file_link.split("/").pop()}
                              </p>
                              <p class="file-size">
                                {bytesToMegabytes(file?.size)} MB
                              </p>
                            </div>
                          </div>
                          <div class="file-overlay">
                            <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                              <span class="icon">
                                {/* <i data-feather="arrow-down"></i> */}
                                <button
                                  key={index}
                                  style={{
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() =>
                                    downloadFile(
                                      file.file_link,
                                      file.created_at
                                    )
                                  }
                                >
                                  <FaArrowDown color="white" />
                                </button>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div class="my-5">
                      <button
                        class="btn btn-outline-light me-2"
                        data-bs-toggle="collapse"
                        data-bs-target="#compose_email"
                        aria-expanded="false"
                      >
                        <span>
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="corner-up-left"></i>
                            </span>
                          </span>
                          <span>Reply</span>
                        </span>
                      </button>
                      <button
                        class="btn btn-outline-light"
                        data-bs-toggle="collapse"
                        data-bs-target="#compose_email"
                        aria-expanded="false"
                      >
                        <span>
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="arrow-right"></i>
                            </span>
                          </span>
                          <span>Forward</span>
                        </span>
                      </button>
                    </div>
                    {/* <!-- Compose email --> */}
                    <div id="compose_email" class="collapse mt-7">
                      <div class="d-flex">
                        <div class="media">
                          <div class="media-head me-3">
                            <div class="avatar avatar-icon avatar-soft-light avatar-rounded d-8">
                              <span class="initial-wrap">
                                <i class="ri-user-fill"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <form
                          className="card p-3"
                          onSubmit={handleSubmit(handleSendEmail)}
                        >
                          <div className="w-100 mb-1">
                            <InputField
                              name="subject"
                              placeholder="Subject"
                              control={control}
                              errors={errors}
                            />
                          </div>
                          <div className="w-100 mb-1">
                            <InputField
                              name="to"
                              placeholder="email"
                              defaultValue={
                                emailDetails.selectedEmail.reciever.email
                              }
                              control={control}
                              errors={errors}
                            />
                          </div>

                          <div className="w-100 mb-1">
                            <TextAreaField
                              name="body"
                              placeholder="Text"
                              rows={7}
                              control={control}
                              errors={errors}
                            />
                          </div>
                          <div class="compose-email-footer mt-5">
                            <div>
                              <button
                                class="btn btn-primary me-2"
                                type="submit"
                              >
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
                    {/* <!-- /Compose email --> */}
                    {/* 
                    <div class="attachment-box">
                      <div>
                        <div class="media">
                          <div class="avatar avatar-icon avatar-sm avatar-warning">
                            <span class="initial-wrap fs-3">
                              <i class="ri-file-zip-fill"></i>
                            </span>
                          </div>
                          <div class="media-body">
                            <p class="file-name">themeforest-pack.zip</p>
                            <p class="file-size">2.45 GB</p>
                          </div>
                        </div>
                        <div class="file-overlay">
                          <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                            <span class="icon">
                              <i data-feather="arrow-down"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          {emailDetails?.emails?.length > 0 &&
            emailDetails?.emails?.map((email) => (
              <div class="accordion-item">
                <div
                  id={`"simple-heading-${email.id}`}
                  class="accordion-header"
                >
                  <div>
                    <div class="email-head">
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target={`#simple-collapse-${email.id}`}
                        role="button"
                        aria-expanded="false"
                      ></div>
                      <div class="media">
                        <div class="media-head">
                          <div class="avatar d-8">
                            <img
                              // src="dist/img/avatar2.jpg"
                              src={email?.sender?.avatar}
                              alt="user"
                              class="avatar-img rounded-circle"
                            />
                          </div>
                        </div>
                        <div class="media-body">
                          <div>{email?.sender?.name}</div>
                          <div class="fs-7">
                            <span>to</span>
                            <div class="mail-desc-dropdown">
                              <a
                                href="/"
                                class="dropdown-toggle link-dark"
                                data-bs-toggle="dropdown"
                              >
                                me
                              </a>
                              <div class="dropdown-menu">
                                <div>
                                  <span>from :</span>
                                  <span>
                                    {/* {email?.sender?.email}{" "} */}
                                    <span>
                                      &lt;
                                      {email?.sender?.email}
                                      &gt;
                                    </span>
                                  </span>
                                </div>
                                <div>
                                  <span>to :</span>
                                  <span>
                                    {/* {email?.reciever?.email}{" "} */}
                                    <span>
                                      &lt;
                                      {email?.reciever?.email}
                                      &gt;
                                    </span>
                                  </span>
                                </div>
                                <div>
                                  <span>date :</span>
                                  <span>
                                    {moment(email?.created_at, "h:mm A").format(
                                      "h:mm A"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="email-head-action">
                        <div class="email-time">
                          {" "}
                          {moment(email?.created_at, "h:mm A").format("h:mm A")}
                        </div>
                        <span class="email-star marked">
                          <span class="feather-icon">
                            <i data-feather="star"></i>
                          </span>
                        </span>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm"
                          href="/"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="corner-up-left"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm dropdown-toggle no-caret"
                          href="/"
                          data-bs-toggle="dropdown"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="more-vertical"></i>
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" href="/">
                            Forward
                          </a>
                          <a class="dropdown-item" href="/">
                            Delete
                          </a>
                          <a class="dropdown-item" href="/">
                            Report Spam
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id={`simple-collapse-${email.id}`}
                  class="accordion-collapse collapse"
                >
                  <div class="accordion-body">
                    {email?.body}
                    {/* <img
                      class="d-block mt-2 mb-3"
                      src="dist/img/signature-1.png"
                      alt="signature"
                    /> */}
                    <div class="separator separator-light"></div>
                    <div class="text-end">
                      <a href="/" class="link-theme fs-7">
                        <u>Download All</u>
                      </a>
                    </div>
                    <div class="email-attachment-wrap">
                      {/* <div class="attachment-box">
                        <div>
                          <div class="media">
                            <div class="avatar avatar-icon avatar-sm avatar-blue">
                              <span class="initial-wrap fs-3">
                                <i class="ri-file-excel-2-fill"></i>
                              </span>
                            </div>
                            <div class="media-body">
                              <p class="file-name">Website_content.xls</p>
                              <p class="file-size">2,635 KB</p>
                            </div>
                          </div>
                          <div class="file-overlay">
                            <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                              <span class="icon">
                                <i data-feather="arrow-down"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="attachment-box">
                        <div>
                          <div class="media">
                            <div class="avatar avatar-icon avatar-sm avatar-warning">
                              <span class="initial-wrap fs-3">
                                <i class="ri-file-zip-fill"></i>
                              </span>
                            </div>
                            <div class="media-body">
                              <p class="file-name">themeforest-pack.zip</p>
                              <p class="file-size">2.45 GB</p>
                            </div>
                          </div>
                          <div class="file-overlay">
                            <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                              <span class="icon">
                                <i data-feather="arrow-down"></i>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div> */}
                      {email?.files?.map((file, index) => (
                        <div class="attachment-box">
                          <div>
                            <div class="media">
                              <div class="avatar avatar-icon avatar-sm avatar-blue">
                                <span class="initial-wrap fs-3">
                                  {/* <i class="ri-file-excel-2-fill"></i> */}
                                  <FilePreview
                                    fileType={getFileExtension(file?.file_link)}
                                    fileUrl={file?.file_link}
                                    fileWidth={45}
                                  />
                                </span>
                              </div>
                              <div class="media-body">
                                <p class="file-name">
                                  {file?.file_link.split("/").pop()}
                                </p>
                                <p class="file-size">
                                  {bytesToMegabytes(file?.size)} MB
                                </p>
                              </div>
                            </div>
                            <div class="file-overlay">
                              <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                                <span class="icon">
                                  {/* <i data-feather="arrow-down"></i> */}
                                  <button
                                    key={index}
                                    style={{
                                      border: "none",
                                      background: "none",
                                    }}
                                    onClick={() =>
                                      downloadFile(
                                        file.file_link,
                                        file.created_at
                                      )
                                    }
                                  >
                                    <FaArrowDown color="white" />
                                  </button>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div class="my-5">
                        <button
                          class="btn btn-outline-light me-2"
                          data-bs-toggle="collapse"
                          data-bs-target="#compose_email"
                          aria-expanded="false"
                        >
                          <span>
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="corner-up-left"></i>
                              </span>
                            </span>
                            <span>Reply</span>
                          </span>
                        </button>
                        <button
                          class="btn btn-outline-light"
                          data-bs-toggle="collapse"
                          data-bs-target="#compose_email"
                          aria-expanded="false"
                        >
                          <span>
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="arrow-right"></i>
                              </span>
                            </span>
                            <span>Forward</span>
                          </span>
                        </button>
                      </div>
                      {/* <!-- Compose email --> */}
                      <div id="compose_email" class="collapse mt-7">
                        <div class="d-flex">
                          <div class="media">
                            <div class="media-head me-3">
                              <div class="avatar avatar-icon avatar-soft-light avatar-rounded d-8">
                                <span class="initial-wrap">
                                  <i class="ri-user-fill"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                          <form
                            className="card p-3"
                            onSubmit={handleSubmit(handleSendEmail)}
                          >
                            <div className="w-100 mb-1">
                              <InputField
                                name="subject"
                                placeholder="Subject"
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div className="w-100 mb-1">
                              <InputField
                                name="to"
                                placeholder="email"
                                defaultValue={email.reciever.email}
                                control={control}
                                errors={errors}
                              />
                            </div>

                            <div className="w-100 mb-1">
                              <TextAreaField
                                name="body"
                                placeholder="Text"
                                rows={7}
                                control={control}
                                errors={errors}
                              />
                            </div>
                            <div class="compose-email-footer mt-5">
                              <div>
                                <button
                                  class="btn btn-primary me-2"
                                  type="submit"
                                >
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
                      {/* <!-- /Compose email --> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmailDetails;
