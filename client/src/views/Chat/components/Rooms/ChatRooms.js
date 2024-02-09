import React, { useState } from "react";

const ChatRooms = ({ rooms, authUser, socket, onDataFromChild, messages }) => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const sendDataToParent = () => {
    // Call the callback function with the data from the child
    onDataFromChild(selectedRoom);
  };

  const roomClickHandler = (room) => {
    console.log("🚀 ~ roomClickHandler ~ room:", room);
    setSelectedRoom(room);
    console.log("🚀 ~ ChatRooms ~ selectedRoom:", room.name);
    sendDataToParent();
    socket.emit("joinRoom", { roomId: room.name });
  };
  function formatRelativeDate(date) {
    const inputDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (inputDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (inputDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return inputDate.toLocaleDateString("en-US", options);
    }
  }
  return (
    <div>
      {" "}
      <ul class="chat-contacts-list list-group list-group-flush">
        {rooms?.length > 0 ? (
          rooms?.map((room, index) => {
            const messageArray = messages?.filter(
              (msg) => msg.room === room.name
            );
            const lastMessage = messageArray[messageArray.length - 1];
            return (
              <li
                class="list-group-item"
                key={index}
                onClick={() => roomClickHandler(room)}
              >
                <div class="media">
                  <div class="media-head">
                    <div class="avatar avatar-sm avatar-rounded position-relative">
                      <img
                        //   src="dist/img/avatar2.jpg"
                        src={
                          room.user_id_1 === authUser?.id
                            ? room.user_image_2
                            : room.user_image_1
                        }
                        alt="user"
                        class="avatar-img"
                      />
                      <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                    </div>
                  </div>
                  <div class="media-body">
                    <div>
                      <div class="user-name">
                        {" "}
                        {room.user_id_1 === authUser?.id
                          ? room.user_name_2
                          : room.user_name_1}{" "}
                      </div>
                      <div class="user-last-chat">
                        {/* Please send some insights of presentation */}
                        {lastMessage !== undefined && lastMessage.message}
                      </div>
                    </div>
                    <div>
                      <div class="last-chat-time">
                        {lastMessage?.created_at
                          ? formatRelativeDate(
                              lastMessage?.created_at || new Date()
                            )
                          : "..."}
                      </div>
                      <div class="badge badge-primary badge-sm badge-pill">
                        15
                      </div>
                      <div class="dropdown action-drp">
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
                            Mute Chat
                          </a>
                          <a class="dropdown-item" href="/">
                            Archive Chat
                          </a>
                          <a class="dropdown-item" href="/">
                            Delete Chat
                          </a>
                          <a class="dropdown-item link-danger" href="/">
                            Block
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <li>No rooms till.</li>
        )}
        {/* <li class="list-group-item">
          <div class="media read-chat active-user">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded position-relative">
                <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
                <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Huma Therman</div>
                <div class="user-last-chat">
                  Typing<span class="one">.</span>
                  <span class="two">.</span>
                  <span class="three">.</span>
                </div>
              </div>
              <div>
                <div class="last-chat-time">10:25 PM</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded">
                <img
                  src="dist/img/avatar13.jpg"
                  alt="user"
                  class="avatar-img"
                />
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Charlie Chaplin</div>
                <div class="user-last-chat">
                  Hello mike, thank you for inviting
                </div>
              </div>
              <div>
                <div class="last-chat-time">5 min</div>
                <div class="badge badge-primary badge-sm badge-pill">2</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media  read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-soft-danger avatar-rounded">
                <span class="initial-wrap">W</span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Winston Churchil</div>
                <div class="user-last-chat">
                  Show me what reports you have left
                </div>
              </div>
              <div>
                <div class="last-chat-time">3:15 PM</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                <img src="dist/img/avatar1.jpg" alt="user" class="avatar-img" />
                <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                  <div class="badge-icon-wrap">
                    <i class="ri-group-fill text-light"></i>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 127">
                    <g
                      data-name="Ellipse 302"
                      transform="translate(8 8)"
                      stroke-width="3"
                    >
                      <circle
                        cx="55.5"
                        cy="55.5"
                        r="55.5"
                        stroke="currentColor"
                      ></circle>
                      <circle
                        cx="55.5"
                        cy="55.5"
                        r="59.5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">😐 Office Board</div>
                <div class="user-last-chat">
                  Huma: great work <span class="text-primary">@jaquiline</span>{" "}
                  you have done a great job
                </div>
              </div>
              <div>
                <div class="last-chat-time">Yesterday</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded position-relative">
                <img
                  src="dist/img/avatar15.jpg"
                  alt="user"
                  class="avatar-img"
                />
                <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Boss Baby</div>
                <div class="user-last-chat">Meeting in the morning</div>
              </div>
              <div>
                <div class="last-chat-time">5:23 AM</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-primary avatar-rounded">
                <span class="initial-wrap">H</span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Hencework</div>
                <div class="user-last-chat">
                  give me the last copy of jampack
                </div>
              </div>
              <div>
                <div class="last-chat-time">24 Jan</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded position-relative">
                <img src="dist/img/avatar3.jpg" alt="user" class="avatar-img" />
                <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Jaquiline Joker</div>
                <div class="user-last-chat">
                  This is my test chat msg last one
                </div>
              </div>
              <div>
                <div class="last-chat-time">4:05 AM</div>
                <div class="badge badge-primary badge-sm badge-pill">37</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded position-relative">
                <img src="dist/img/avatar7.jpg" alt="user" class="avatar-img" />
                <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Tom Cruz</div>
                <div class="user-last-chat text-danger">
                  <span class="feather-icon fe-x me-1">
                    <i data-feather="phone-call"></i>
                  </span>
                  Missed call
                </div>
              </div>
              <div>
                <div class="last-chat-time">7:40PM</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-rounded">
                <img src="dist/img/avatar9.jpg" alt="user" class="avatar-img" />
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Katherine Jones</div>
                <div class="user-last-chat">
                  Hi!!! I was wondering if you are free
                </div>
              </div>
              <div>
                <div class="last-chat-time">Yesterday</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="media read-chat">
            <div class="media-head">
              <div class="avatar avatar-sm avatar-soft-info avatar-rounded">
                <span class="initial-wrap">D</span>
              </div>
            </div>
            <div class="media-body">
              <div>
                <div class="user-name">Danial Craig</div>
                <div class="user-last-chat">
                  Boss is looking for you in the office
                </div>
              </div>
              <div>
                <div class="last-chat-time">3:15PM</div>
                <div class="dropdown action-drp">
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
                      Mute Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Archive Chat
                    </a>
                    <a class="dropdown-item" href="/">
                      Delete Chat
                    </a>
                    <a class="dropdown-item link-danger" href="/">
                      Block
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default ChatRooms;
