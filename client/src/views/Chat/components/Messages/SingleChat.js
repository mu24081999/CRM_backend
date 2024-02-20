import _ from "lodash";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  FaArrowAltCircleRight,
  FaArrowDown,
  FaFileExport,
  FaPhone,
  FaVideo,
  FaInfo,
} from "react-icons/fa";
import AWS from "aws-sdk";
import FilePreview from "../../../../components/FilePreview/FilePreview";
import { SocketContext } from "../../../../Context";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/services/users";

const SingleChat = ({ messages, selectedRoom, authUser, socket }) => {
  const {
    me,
    // leaveCall,
    calling,
    // myVideo,
    // name,
    // setName,
    // callEnded,
    // leaveCall,
    readyForCall,
    readyForAudioCall,
    call,
    callUser,
  } = useContext(SocketContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersArray, setUsersArray] = useState(null);
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser && me && token) {
      // callUser(selectedUser?.socket_id, authUser.name);
    }
  }, [selectedUser, authUser, callUser, call, me, token]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersArray(users);
    }
  }, [users]);

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
    }
  }, [token, dispatch]);
  useEffect(() => {
    const selectedId =
      selectedRoom.user_id_1 === authUser.id
        ? selectedRoom.user_id_2
        : selectedRoom.user_id_1;
    if (usersArray?.length > 0) {
      const response = usersArray?.filter((user) => user.id === selectedId);
      setSelectedUser(response[0]);
    }
  }, [usersArray, authUser, selectedRoom]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [files, setFiles] = useState([]);

  const [message, setMessage] = useState();

  const sendMessage = () => {
    // if (e.key === "Enter") {

    let formData;
    if (selectedFile) {
      formData = {
        sender:
          selectedRoom && selectedRoom?.user_id_1 === authUser?.id
            ? selectedRoom.user_id_1
            : selectedRoom?.user_id_2,
        recipient:
          selectedRoom && selectedRoom?.user_id_1 === authUser?.id
            ? selectedRoom.user_id_2
            : selectedRoom?.user_id_1,
        room: selectedRoom?.name,
        file_name: selectedFile.name,
        file_data: selectedFile,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        type: "file",
      };
    } else {
      formData = {
        sender:
          selectedRoom && selectedRoom?.user_id_1 === authUser?.id
            ? selectedRoom.user_id_1
            : selectedRoom?.user_id_2,
        recipient:
          selectedRoom && selectedRoom?.user_id_1 === authUser?.id
            ? selectedRoom.user_id_2
            : selectedRoom?.user_id_1,
        room: selectedRoom?.name,
        message: message,
        type: "text",
      };
    }
    socket.emit("chat_message", formData);
    // socket.emit("chat_message", messageData);
    setMessage("");
    setSelectedFile("");
    document
      .getElementById("dummy_avatar")
      .scrollIntoView({ behavior: "smooth", block: "end" });

    //   const chatBody = document.getElementById("chat_body");
    //   chatBody.scrollTop = chatBody.scrollHeight;
    // }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    document
      .getElementById("dummy_avatar")
      .scrollIntoView({ behavior: "smooth", block: "end" });
    // Configure AWS
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    // Create S3 service object
    const s3 = new AWS.S3();

    const fetchObjects = async () => {
      const params = {
        Bucket: "jampackcrm",
      };
      try {
        const data = await s3.listObjectsV2(params).promise();
        setFiles(data.Contents);
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    fetchObjects();
  }, []);
  const downloadFile = async (bucketName, objectKey) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };
    try {
      const data = await s3.getObject(params).promise();
      const url = URL.createObjectURL(new Blob([data.Body]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", objectKey);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const getFile = (key) => {
    const file = files?.filter((fl) => fl.Key === key);
    return file;
  };
  // Function to extract file extension from the file name
  function getFileExtension(filename) {
    const resp = filename?.split(".").pop().toLowerCase();
    return resp;
  }
  // Function to convert bytes to gigabytes (GB)
  function bytesToGigabytes(bytes) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
  }

  // Function to convert bytes to megabytes (MB)
  function bytesToMegabytes(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  return (
    <div class="chatapp-single-chat">
      <header class="chat-header">
        <a
          id="back_user_list"
          class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover back-user-list"
          href="/"
        >
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="chevron-left"></i>
            </span>
          </span>
        </a>
        <div class="media">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded position-relative">
              <img
                src={
                  selectedRoom?.user_id_1 === authUser?.id
                    ? selectedRoom?.user_image_2
                    : selectedRoom?.user_image_1 ||
                      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                }
                alt="user"
                class="avatar-img"
              />
              <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
            </div>
          </div>
          <div class="media-body">
            <div class="user-name">
              {" "}
              {selectedRoom?.user_id_1 === authUser?.id
                ? selectedRoom?.user_name_2
                : selectedRoom?.user_name_1}
            </div>
            <div class="user-status">
              Typing<span class="one">.</span>
              <span class="two">.</span>
              <span class="three">.</span>
            </div>
          </div>
        </div>
        <div class="chat-options-wrap">
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret d-none d-xl-block"
            href="/"
            data-bs-toggle="modal"
            data-bs-target="#invite_people"
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Invite people"
            >
              <span class="feather-icon">
                <i data-feather="user-plus"></i>
              </span>
            </span>
          </a>
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-none d-xl-block"
            href="/"
            data-bs-toggle="modal"
            data-bs-target="#audio_call"
            onClick={() => {
              calling();
              readyForAudioCall();
            }}
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Audio call"
            >
              <span class="feather-icon">
                <FaPhone />
              </span>
            </span>
          </a>
          <a
            id="triggerCall"
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-none d-xl-block"
            href="/"
            data-bs-toggle="modal"
            data-bs-target="#video_call"
            onClick={() => {
              calling();
              readyForCall();
            }}
            // onClick={() => callUser(selectedUser?.socket_id, authUser.name)}
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Video Call"
            >
              <span class="feather-icon">
                {/* <i data-feather="video"></i> */}
                <FaVideo />
              </span>
            </span>
          </a>
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover chatapp-info-toggle active"
            href="/"
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Info"
            >
              <span class="feather-icon">
                <i data-feather="info"></i>
                <FaInfo />
              </span>
            </span>
          </a>
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
            href="/"
            data-bs-toggle="dropdown"
          >
            <span
              class="icon"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="More"
            >
              <span class="feather-icon">
                <i data-feather="more-vertical"></i>
              </span>
            </span>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <a
              class="d-xl-none dropdown-item"
              href="/"
              data-bs-toggle="modal"
              data-bs-target="invite_people"
            >
              <span class="feather-icon dropdown-icon">
                <i data-feather="user-plus"></i>
              </span>
              <span>Invite People</span>
            </a>
            <a
              class="d-xl-none dropdown-item"
              href="/"
              data-bs-toggle="modal"
              data-bs-target="#audio_call"
            >
              <span class="feather-icon dropdown-icon">
                <i data-feather="phone"></i>
              </span>
              <span>Audio Call</span>
            </a>
            <a
              class="d-xl-none dropdown-item"
              href="/"
              data-bs-toggle="modal"
              data-bs-target="#video_call"
            >
              <span class="feather-icon dropdown-icon">
                <i data-feather="video"></i>
              </span>
              <span>Video Call</span>
            </a>
            <div class="d-xl-none dropdown-divider"></div>
            <a class="dropdown-item" href="/">
              <span class="feather-icon dropdown-icon">
                <i data-feather="star"></i>
              </span>
              <span>Stared Messages</span>
            </a>
            <a class="dropdown-item" href="/">
              <span class="feather-icon dropdown-icon">
                <i data-feather="archive"></i>
              </span>
              <span>Archive Messages</span>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="/">
              <span class="feather-icon dropdown-icon">
                <i data-feather="slash"></i>
              </span>
              <span>Block Content</span>
            </a>
            <a class="dropdown-item" href="/">
              <span class="feather-icon dropdown-icon">
                <i data-feather="external-link"></i>
              </span>
              <span>Feedback</span>
            </a>
          </div>
          <a
            class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-none d-xl-block"
            href="/"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=""
            data-bs-original-title="Collapse"
          >
            <span class="icon">
              <span class="feather-icon">
                <i data-feather="chevron-up"></i>
              </span>
              <span class="feather-icon d-none">
                <i data-feather="chevron-down"></i>
              </span>
            </span>
          </a>
        </div>
      </header>
      <div data-simplebar id="chat_body" class="chat-body">
        <ul id="dummy_avatar" class="list-unstyled chat-single-list">
          {messages?.length > 0 ? (
            messages.map((msg, index) =>
              _.toInteger(msg?.sender) !== authUser?.id ? (
                <li class="media received" key={index}>
                  <div class="avatar avatar-xs avatar-rounded">
                    <img
                      //   src="dist/img/avatar8.jpg"
                      src={
                        _.toInteger(msg.recipient) === selectedRoom.user_id_1
                          ? selectedRoom?.user_image_1
                          : selectedRoom?.user_image_2
                      }
                      alt="user"
                      class="avatar-img"
                    />
                  </div>
                  <div class="media-body">
                    <div class="msg-box">
                      <div>
                        {msg?.file_key && (
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() =>
                              downloadFile(
                                "jampackcrm",
                                getFile(msg.file_key)[0]?.Key
                              )
                            }
                          >
                            <FilePreview
                              fileType={getFileExtension(msg?.file_key)}
                              fileUrl={`https://s3.eu-west-2.amazonaws.com/jampackcrm/${msg?.file_key}`}
                            />
                          </button>
                        )}
                        <p>{msg.message}</p>
                        <span class="chat-time">
                          {moment(message?.created_at).format("h:mm A")}
                          <span className="float-end">
                            {" "}
                            {msg?.file_key &&
                              (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                " mb"}
                          </span>
                        </span>
                      </div>
                      <div class="msg-action">
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="corner-up-right"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="/">
                            Forward
                          </a>
                          <a class="dropdown-item" href="/">
                            Copy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li class="media sent" key={index}>
                  <div class="media-body">
                    <div class="msg-box">
                      <div>
                        {msg?.file_key && (
                          <button
                            style={{ border: "none", background: "none" }}
                            onClick={() =>
                              downloadFile(
                                "jampackcrm",
                                getFile(msg.file_key)[0]?.Key
                              )
                            }
                          >
                            <FilePreview
                              fileType={getFileExtension(msg?.file_key)}
                              fileUrl={`https://s3.eu-west-2.amazonaws.com/jampackcrm/${msg?.file_key}`}
                            />
                          </button>
                        )}
                        <p>{msg.message}</p>
                        <span class="chat-time">
                          {moment(message?.created_at).format("h:mm A")}
                          <span className="float-end">
                            {" "}
                            {msg?.file_key &&
                              (msg?.file_size / (1024 * 1024)).toFixed(2) +
                                " mb"}
                          </span>
                        </span>
                      </div>
                      <div class="msg-action">
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="corner-up-right"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          href="/"
                          class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                          data-bs-toggle="dropdown"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="more-horizontal"></i>
                            </span>
                          </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <a class="dropdown-item" href="/">
                            Forward
                          </a>
                          <a class="dropdown-item" href="/">
                            Copy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )
          ) : (
            <li> No Messages</li>
          )}

          {/* <li class="media media-attachment received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body msg-docs">
              <div class="msg-box">
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
                        <span class="feather-icon">
                          <i data-feather="arrow-down"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="msg-box">
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
                        <span class="feather-icon">
                          <i data-feather="arrow-down"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>

                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="day-sep">
            <span>Today</span>
          </li>
          <li class="media sent">
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Anyways, I am working on something that you would like to
                    know. This project is based on angular js and you are the
                    keeda in it. I need you help in it.
                  </p>
                  <span class="chat-time">11:52 PM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media media-attachment received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body msg-imgs">
              <div class="msg-box">
                <div>
                  <img
                    class="d-block img-fluid"
                    src="dist/img/giphy.gif"
                    alt="gif"
                  />
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media sent">
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Haha, this joke is hilarious. Is it what your heart feel
                    about the salary? 😍
                  </p>
                  <span class="chat-time">10:52 PM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="media received">
            <div class="avatar avatar-xs avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <div class="media-body">
              <div class="msg-box">
                <div>
                  <p>
                    Hey Ben, just a reminder that you are coming for the meeting
                    today in the conference. We are proposing a change in the
                    client briefing.
                  </p>
                  <span class="chat-time">9:20 AM</span>
                </div>
                <div class="msg-action">
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover no-caret"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="corner-up-right"></i>
                      </span>
                    </span>
                  </a>
                  <a
                    href="/"
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                    data-bs-toggle="dropdown"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="more-horizontal"></i>
                      </span>
                    </span>
                  </a>
                  <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="/">
                      Forward
                    </a>
                    <a class="dropdown-item" href="/">
                      Copy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
      </div>

      <footer class="chat-footer">
        <button
          className="btn btn-primary rounded-circle  float-end"
          style={{ width: "35px" }}
          onClick={() =>
            document
              .getElementById("dummy_avatar")
              .scrollIntoView({ behavior: "smooth", block: "end" })
          }
        >
          <FaArrowDown style={{ marginLeft: "-7px" }} />
        </button>
        <button
          class="btn btn-icon btn-flush-primary btn-rounded flush-soft-hover flex-shrink-0"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="icon">
            <span class="feather-icon">
              {/* <i data-feather="share"></i> */}
              <FaFileExport />
            </span>
          </span>
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-icon avatar-xs avatar-soft-primary avatar-rounded me-3">
                <span class="initial-wrap">
                  <i class="ri-image-line"></i>
                </span>
              </div>
              <div>
                <span class="h6 mb-0">
                  <input type="file" onChange={handleFileChange} />
                </span>
              </div>
            </div>
          </a>
          <a class="dropdown-item" href="/">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-icon avatar-xs avatar-soft-info avatar-rounded me-3">
                <span class="initial-wrap">
                  <i class="ri-file-4-line"></i>
                </span>
              </div>
              <div>
                <span class="h6 mb-0">Documents</span>
              </div>
            </div>
          </a>
          <a class="dropdown-item" href="/">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-icon avatar-xs avatar-soft-success avatar-rounded me-3">
                <span class="initial-wrap">
                  <i class="ri-map-pin-line"></i>
                </span>
              </div>
              <div>
                <span class="h6 mb-0">Location</span>
              </div>
            </div>
          </a>
          <a class="dropdown-item" href="/">
            <div class="d-flex align-items-center">
              <div class="avatar avatar-icon avatar-xs avatar-soft-blue avatar-rounded me-3">
                <span class="initial-wrap">
                  <i class="ri-contacts-line"></i>
                </span>
              </div>
              <div>
                <span class="h6 mb-0">Contact</span>
              </div>
            </div>
          </a>
        </div>
        <div class="input-group">
          <span class="input-affix-wrapper">
            <input
              type="text"
              //   id="input_msg_send_chatapp"
              name="send-msg"
              class="input-msg-send form-control rounded-input"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            />
            <span class="input-suffix">
              <button
                class="btn btn-icon btn-flush-primary btn-rounded btn-send"
                onClick={sendMessage}
              >
                <span class="icon">
                  {/* <span class="feather-icon"></span> */}
                  <FaArrowAltCircleRight />
                </span>
              </button>
            </span>
          </span>
        </div>
        <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
          <span class="icon">
            <span class="feather-icon">
              <i data-feather="smile"></i>
            </span>
          </span>
        </button>
      </footer>
      <div class="chat-info">
        <div data-simplebar class="nicescroll-bar">
          <button type="button" class="info-close btn-close">
            <span aria-hidden="true">×</span>
          </button>
          <div class="text-center">
            <div class="avatar avatar-xxl avatar-rounded">
              <img
                src={
                  selectedRoom?.user_id_1 === authUser?.id
                    ? selectedRoom?.user_image_2
                    : selectedRoom?.user_image_1 ||
                      "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                }
                alt="user"
                class="avatar-img"
              />
            </div>
            <div class="cp-name text-truncate mt-2">
              {" "}
              {selectedRoom?.user_id_1 === authUser?.id
                ? selectedRoom?.user_name_2
                : selectedRoom?.user_name_1}
            </div>
            <p class="text-truncate">No phone calls Always busy</p>
          </div>

          <ul class="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
            <li class="nav-item">
              <a class="nav-link active" data-bs-toggle="tab" href="/tab_info">
                <span class="nav-link-text">Info</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-bs-toggle="tab" href="/tab_files">
                <span class="nav-link-text">Files</span>
              </a>
            </li>
          </ul>
          <div class="tab-content mt-4">
            <div class="tab-pane fade show active" id="tab_info">
              <form role="search">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search in conversation"
                />
              </form>
              <div class="collapse-simple mt-3">
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/gn_info"
                      aria-expanded="true"
                    >
                      General Info
                    </a>
                  </div>
                  <div id="gn_info" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-info">
                        <li>
                          <a href="/">
                            <span class="cp-icon-wrap">
                              <span class="feather-icon">
                                <i data-feather="briefcase"></i>
                              </span>
                            </span>
                            Co-Founder
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span class="cp-icon-wrap">
                              <span class="feather-icon">
                                <i data-feather="mail"></i>
                              </span>
                            </span>
                            <span class="text-primary">
                              contact@hencework.com
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span class="cp-icon-wrap">
                              <span class="feather-icon">
                                <i data-feather="phone"></i>
                              </span>
                            </span>
                            +91-25-4125-2365
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <span class="cp-icon-wrap">
                              <span class="feather-icon">
                                <i data-feather="map-pin"></i>
                              </span>
                            </span>
                            Oslo, Canada
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/social_profile"
                      aria-expanded="true"
                    >
                      Social Profile{" "}
                    </a>
                  </div>
                  <div id="social_profile" class="collapse show">
                    <div class="card-body">
                      <ul class="hk-list hk-list-sm">
                        <li>
                          <button class="btn btn-icon btn-rounded btn-primary">
                            <span class="icon">
                              <i class="fab fa-behance"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-warning">
                            <span class="icon">
                              <i class="fab fa-google-drive"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-info">
                            <span class="icon">
                              <i class="fab fa-dropbox"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-dark">
                            <span class="icon">
                              <i class="fab fa-github"></i>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-rounded btn-danger">
                            <span class="icon">
                              <i class="fab fa-google"></i>
                            </span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/biography"
                      aria-expanded="true"
                    >
                      Biography{" "}
                    </a>
                  </div>
                  <div id="biography" class="collapse show">
                    <div class="card-body">
                      <p>
                        Hello there, Huma Therman is a brilliant co-founder and
                        a copy writer working for almost a decade for fortune
                        500 companies. I am well verse with multiple foreign
                        languages and I love to produce good quality stuff.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/settings"
                      aria-expanded="true"
                    >
                      Settings{" "}
                    </a>
                  </div>
                  <div id="settings" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-action">
                        <li>
                          <a href="/">Clear Chat</a>
                        </li>
                        <li>
                          <a href="/">
                            <span class="text-danger">Block Contact</span>
                          </a>
                        </li>
                        <li>
                          <a href="/">Somthing's Wrong</a>
                        </li>
                      </ul>
                      <a href="/" class="d-block text-dark fs-7 mb-10">
                        Give feedback and report conversation
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="tab_files">
              <form role="search">
                <input
                  type="text"
                  class="form-control search-files"
                  placeholder="Search files"
                />
              </form>
              <div class="collapse-simple mt-3">
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/files_collapse"
                      aria-expanded="true"
                    >
                      Yesterday
                    </a>
                  </div>
                  <div id="files_collapse" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-files">
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-blue">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-excel-2-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">website_content.exl</p>
                                <p class="file-size">2,635 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-light">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-text-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">jampack.pdf</p>
                                <p class="file-size">1.3 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-warning">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-zip-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">themeforest-pack.zip</p>
                                <p class="file-size">2.45 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-logo avatar-sm">
                                <span class="initial-wrap">
                                  <img src="dist/img/6image.png" alt="user" />
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  bruce-mars-fiEG-Pk6ZASFPk6ZASF
                                </p>
                                <p class="file-size">4,178 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-logo avatar-sm">
                                <span class="initial-wrap">
                                  <img src="dist/img/2image.png" alt="user" />
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  jonas-kakaroto-KIPqvvTKIPqvvT
                                </p>
                                <p class="file-size">951 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <a
                      role="button"
                      data-bs-toggle="collapse"
                      href="/files_collapse_1"
                      aria-expanded="true"
                    >
                      23 April
                    </a>
                  </div>
                  <div id="files_collapse_1" class="collapse show">
                    <div class="card-body">
                      <ul class="cp-files">
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-light">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-keynote-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">presentation.keynote</p>
                                <p class="file-size">20 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item link-danger" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-icon avatar-sm avatar-soft-warning">
                                <span class="initial-wrap fs-3">
                                  <i class="ri-file-zip-fill"></i>
                                </span>
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">PACK-TRIAL.zip</p>
                                <p class="file-size">2.45 GB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item" href="/">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="media">
                            <div class="media-head">
                              <div class="avatar avatar-sm">
                                <img
                                  src="dist/img/img-thumb1.jpg"
                                  alt="user"
                                  class="avatar-img"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <div>
                                <p class="file-name">
                                  joel-mott-LaK153ghdigaghdi
                                </p>
                                <p class="file-size">3,028 KB</p>
                              </div>
                              <div>
                                <a
                                  href="/"
                                  class="btn btn-sm btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                                  data-bs-toggle="dropdown"
                                >
                                  <span class="icon">
                                    <span class="feather-icon">
                                      <i data-feather="more-vertical"></i>
                                    </span>
                                  </span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <a class="dropdown-item" href="/">
                                    Download
                                  </a>
                                  <a class="dropdown-item" href="/">
                                    Delete
                                  </a>
                                </div>
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
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
