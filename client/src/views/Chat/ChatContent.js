import React from "react";

const ChatContent = () => {
  return (
    <div>
      {/* <!-- Wrapper --> */}

      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="chatapp-wrap chatapp-info-active">
            <div class="chatapp-content">
              <div class="chatapp-aside">
                <header class="aside-header">
                  <a
                    class="chatapp-title dropdown-toggle link-dark"
                    data-bs-toggle="dropdown"
                    href="/"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <h1>Chat</h1>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="chats.html">
                      <span class="feather-icon dropdown-icon">
                        <i data-feather="message-square"></i>
                      </span>
                      <span>Chats</span>
                    </a>
                    <a class="dropdown-item" href="chats-contact.html">
                      <span class="feather-icon dropdown-icon">
                        <i data-feather="book"></i>
                      </span>
                      <span>Contacts</span>
                    </a>
                    <a class="dropdown-item" href="chats-group.html">
                      <span class="feather-icon dropdown-icon">
                        <i data-feather="users"></i>
                      </span>
                      <span>Groups</span>
                    </a>
                    <a class="dropdown-item" href="/">
                      <span class="feather-icon dropdown-icon">
                        <i data-feather="archive"></i>
                      </span>
                      <span>Archived</span>
                    </a>
                    <a class="dropdown-item" href="/">
                      <span class="feather-icon dropdown-icon">
                        <i data-feather="star"></i>
                      </span>
                      <span>Favorites</span>
                    </a>
                  </div>
                  <div class="d-flex">
                    <div class="dropdown">
                      <a
                        href="/"
                        class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret"
                        data-bs-toggle="dropdown"
                      >
                        <span class="icon">
                          <span class="feather-icon">
                            <i data-feather="settings"></i>
                          </span>
                        </span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#">
                          <span class="feather-icon dropdown-icon">
                            <i data-feather="user-check"></i>
                          </span>
                          <span>Active Contacts</span>
                        </a>
                        <a class="dropdown-item" href="/">
                          <span class="feather-icon dropdown-icon">
                            <i data-feather="message-square"></i>
                          </span>
                          <span>Chat Requests</span>
                        </a>
                        <a class="dropdown-item" href="/">
                          <span class="feather-icon dropdown-icon">
                            <i data-feather="archive"></i>
                          </span>
                          <span>Archived Chats</span>
                        </a>
                        <a class="dropdown-item" href="/">
                          <span class="feather-icon dropdown-icon">
                            <i data-feather="toggle-right"></i>
                          </span>
                          <span>Unread Chats</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="/">
                          Settings
                        </a>
                        <a class="dropdown-item" href="/">
                          Help
                        </a>
                        <a class="dropdown-item" href="/">
                          Report a problem{" "}
                        </a>
                      </div>
                    </div>
                    <a
                      href="/"
                      class="btn btn-icon btn-rounded btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#invite_people"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="plus"></i>
                        </span>
                      </span>
                    </a>
                  </div>
                </header>
                <div data-simplebar class="aside-body">
                  <form class="aside-search" role="search">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search Chats"
                    />
                  </form>
                  <div class="frequent-contact">
                    <div class="title-sm text-primary">
                      <span>Frequent contact</span>
                    </div>
                    <ul class="hk-list">
                      <li>
                        <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <span class="initial-wrap">H</span>
                          <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                            <div class="badge-icon-wrap">
                              <i class="ri-group-fill text-light"></i>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 127 127"
                            >
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
                      </li>
                      <li>
                        <div class="avatar avatar-sm avatar-primary position-relative avatar-rounded">
                          <img
                            src="dist/img/avatar1.jpg"
                            alt="user"
                            class="avatar-img"
                          />
                          <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                            <div class="badge-icon-wrap">
                              <i class="ri-group-fill text-light"></i>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 127 127"
                            >
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
                      </li>
                      <li>
                        <div class="avatar avatar-sm avatar-soft-danger avatar-rounded position-relative">
                          <span class="initial-wrap">W</span>
                          <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                        </div>
                      </li>
                      <li>
                        <div class="avatar avatar-sm avatar-rounded position-relative">
                          <img
                            src="dist/img/avatar8.jpg"
                            alt="user"
                            class="avatar-img"
                          />
                          <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                        </div>
                      </li>
                      <li>
                        <div class="avatar avatar-sm avatar-rounded">
                          <img
                            src="dist/img/avatar15.jpg"
                            alt="user"
                            class="avatar-img"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <ul class="chat-contacts-list list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="media">
                        <div class="media-head">
                          <div class="avatar avatar-sm avatar-rounded position-relative">
                            <img
                              src="dist/img/avatar2.jpg"
                              alt="user"
                              class="avatar-img"
                            />
                            <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                          </div>
                        </div>
                        <div class="media-body">
                          <div>
                            <div class="user-name">Morgan Freeman</div>
                            <div class="user-last-chat">
                              Please send some insights of presentation
                            </div>
                          </div>
                          <div>
                            <div class="last-chat-time">Yesterday</div>
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
                    <li class="list-group-item">
                      <div class="media read-chat active-user">
                        <div class="media-head">
                          <div class="avatar avatar-sm avatar-rounded position-relative">
                            <img
                              src="dist/img/avatar8.jpg"
                              alt="user"
                              class="avatar-img"
                            />
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
                            <div class="badge badge-primary badge-sm badge-pill">
                              2
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
                            <img
                              src="dist/img/avatar1.jpg"
                              alt="user"
                              class="avatar-img"
                            />
                            <div class="badge-icon badge-circle badge-icon-xxs text-white position-bottom-end-overflow-1">
                              <div class="badge-icon-wrap">
                                <i class="ri-group-fill text-light"></i>
                              </div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 127 127"
                              >
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
                              Huma: great work{" "}
                              <span class="text-primary">@jaquiline</span> you
                              have done a great job
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
                            <div class="user-last-chat">
                              Meeting in the morning
                            </div>
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
                            <img
                              src="dist/img/avatar3.jpg"
                              alt="user"
                              class="avatar-img"
                            />
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
                            <div class="badge badge-primary badge-sm badge-pill">
                              37
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
                    <li class="list-group-item">
                      <div class="media read-chat">
                        <div class="media-head">
                          <div class="avatar avatar-sm avatar-rounded position-relative">
                            <img
                              src="dist/img/avatar7.jpg"
                              alt="user"
                              class="avatar-img"
                            />
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
                            <img
                              src="dist/img/avatar9.jpg"
                              alt="user"
                              class="avatar-img"
                            />
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
                    </li>
                  </ul>
                </div>
              </div>
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
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                        <span class="badge badge-success badge-indicator badge-indicator-lg position-bottom-end-overflow-1"></span>
                      </div>
                    </div>
                    <div class="media-body">
                      <div class="user-name">Huma Therman</div>
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
                      data-bs-target="/audio_call"
                    >
                      <span
                        class="icon"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Audio call"
                      >
                        <span class="feather-icon">
                          <i data-feather="phone"></i>
                        </span>
                      </span>
                    </a>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover d-none d-xl-block"
                      href="/"
                      data-bs-toggle="modal"
                      data-bs-target="/video_call"
                    >
                      <span
                        class="icon"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title=""
                        data-bs-original-title="Video Call"
                      >
                        <span class="feather-icon">
                          <i data-feather="video"></i>
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
                        data-bs-target="/audio_call"
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
                        data-bs-target="/video_call"
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
                    <li class="media received">
                      <div class="avatar avatar-xs avatar-rounded">
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                      <div class="media-body">
                        <div class="msg-box">
                          <div>
                            <p>Cool, lets talk about it tomorrow</p>
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
                        <div class="msg-box">
                          <div>
                            <p>Images for new marketing pages have been sent</p>
                            <span class="chat-time">10:53 PM</span>
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
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
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
                              Anyways, I am working on something that you would
                              like to know. This project is based on angular js
                              and you are the keeda in it. I need you help in
                              it.
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
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
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
                              Haha, this joke is hilarious. Is it what your
                              heart feel about the salary? 😍
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
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                      <div class="media-body">
                        <div class="msg-box">
                          <div>
                            <p>
                              Hey Ben, just a reminder that you are coming for
                              the meeting today in the conference. We are
                              proposing a change in the client briefing.
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
                    </li>
                  </ul>
                </div>
                <footer class="chat-footer">
                  <button
                    class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover flex-shrink-0"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="icon">
                      <span class="feather-icon">
                        <i data-feather="share"></i>
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
                          <span class="h6 mb-0">Photo or Video Library</span>
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
                        id="input_msg_send_chatapp"
                        name="send-msg"
                        class="input-msg-send form-control rounded-input"
                        placeholder="Type your message..."
                      />
                      <span class="input-suffix">
                        <button class="btn btn-icon btn-flush-primary btn-rounded btn-send">
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="arrow-right"></i>
                            </span>
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
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                      <div class="cp-name text-truncate mt-2">Huma Therman</div>
                      <p class="text-truncate">No phone calls Always busy</p>
                    </div>

                    <ul class="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mt-4">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-bs-toggle="tab"
                          href="/tab_info"
                        >
                          <span class="nav-link-text">Info</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href="/tab_files"
                        >
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
                                  Hello there, Huma Therman is a brilliant
                                  co-founder and a copy writer working for
                                  almost a decade for fortune 500 companies. I
                                  am well verse with multiple foreign languages
                                  and I love to produce good quality stuff.{" "}
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
                                      <span class="text-danger">
                                        Block Contact
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="/">Somthing's Wrong</a>
                                  </li>
                                </ul>
                                <a
                                  href="/"
                                  class="d-block text-dark fs-7 mb-10"
                                >
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
                                          <p class="file-name">
                                            website_content.exl
                                          </p>
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                          <p class="file-name">
                                            themeforest-pack.zip
                                          </p>
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                            <img
                                              src="dist/img/6image.png"
                                              alt="user"
                                            />
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                            <img
                                              src="dist/img/2image.png"
                                              alt="user"
                                            />
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                          <p class="file-name">
                                            presentation.keynote
                                          </p>
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
                                            <a
                                              class="dropdown-item link-danger"
                                              href="/"
                                            >
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
                                          <p class="file-name">
                                            PACK-TRIAL.zip
                                          </p>
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

              {/* <!--Audio Call Window --> */}
              <div
                id="audio_call"
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-xl chatapp-call-window"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header header-wth-bg">
                      <h6 class="modal-title text-muted">Jampack Audio Call</h6>
                      <div class="modal-action">
                        <a
                          href="/"
                          class="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover modal-fullscreen-togglable"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="maximize"></i>
                            </span>
                            <span class="feather-icon d-none">
                              <i data-feather="minimize"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          href="/"
                          class="btn btn-xs btn-icon btn-flush-dark btn-rounded flush-soft-hover"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="help-circle"></i>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    <div class="modal-body">
                      <div class="avatar avatar-xxxl avatar-rounded d-20">
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                      <h3 class="mt-3">Huma Therman</h3>
                      <p>
                        Audio Calling<span class="one">.</span>
                        <span class="two">.</span>
                        <span class="three">.</span>
                      </p>
                    </div>
                    <div class="modal-footer">
                      <ul class="chatapp-call-action hk-list">
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="mic"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="video"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            class="btn btn-icon btn-lg btn-rounded btn-danger"
                            data-bs-dismiss="modal"
                          >
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="phone"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="user-plus"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-soft-light">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="more-vertical"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <div class="avatar avatar-lg avatar-rounded chatapp-caller-img">
                        <img
                          src="dist/img/avatar13.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Audio Call Window --> */}

              {/* <!--Video Call Window --> */}
              <div
                id="video_call"
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-xl chatapp-call-window"
                  role="document"
                >
                  <div class="modal-content bg-primary-dark-5">
                    <div class="modal-header header-wth-bg bg-primary-dark-3">
                      <h6 class="modal-title text-muted">Jampack Video Call</h6>
                      <div class="modal-action">
                        <a
                          href="/"
                          class="btn btn-xs btn-icon btn-rounded btn-link link-secondary modal-fullscreen-togglable"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="maximize"></i>
                            </span>
                            <span class="feather-icon d-none">
                              <i data-feather="minimize"></i>
                            </span>
                          </span>
                        </a>
                        <a
                          href="/"
                          class="btn btn-xs btn-icon btn-rounded btn-link link-secondary"
                        >
                          <span class="icon">
                            <span class="feather-icon">
                              <i data-feather="help-circle"></i>
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    <div class="modal-body">
                      <div class="avatar avatar-xxxl avatar-rounded d-20">
                        <img
                          src="dist/img/avatar8.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                      <h3 class="text-white mt-3">Huma Therman</h3>
                      <p class="text-white">
                        Video Calling<span class="one">.</span>
                        <span class="two">.</span>
                        <span class="three">.</span>
                      </p>
                    </div>
                    <div class="modal-footer">
                      <ul class="chatapp-call-action hk-list">
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="mic"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="video"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            class="btn btn-icon btn-lg btn-rounded btn-danger"
                            data-bs-dismiss="modal"
                          >
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="phone"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="user-plus"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                        <li>
                          <button class="btn btn-icon btn-lg btn-rounded btn-dark">
                            <span class="icon">
                              <span class="feather-icon">
                                <i data-feather="more-vertical"></i>
                              </span>
                            </span>
                          </button>
                        </li>
                      </ul>
                      <div class="avatar avatar-lg avatar-rounded chatapp-caller-img">
                        <img
                          src="dist/img/avatar13.jpg"
                          alt="user"
                          class="avatar-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Video Call Window --> */}

              {/* <!-- Invite People --> */}
              <div
                class="modal fade"
                id="invite_people"
                tabindex="-1"
                role="dialog"
              >
                <div
                  class="modal-dialog modal-dialog-centered mw-400p"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header header-wth-bg-inv">
                      <h5 class="modal-title">Invite People</h5>
                      <button
                        type="button"
                        class="btn-close text-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body p-0">
                      <form class="m-3" role="search">
                        <input
                          type="text"
                          class="form-control rounded-input user-search"
                          placeholder="Search People"
                        />
                      </form>
                      <div class="h-350p">
                        <div data-simplebar class="nicescroll-bar">
                          <ul class="invite-user-list">
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar2.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Morgan Freeman</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck2"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar7.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Huma Therman</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck3"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar3.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Charlie Chaplin</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck4"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                    <span class="initial-wrap">W</span>
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Winston Churchil</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck5"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar1.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Office Board</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck6"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar6.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Boss Baby</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck7"
                                />
                              </div>
                            </li>
                            <li>
                              <div class="media d-flex align-items-center">
                                <div class="media-head me-3">
                                  <div class="avatar avatar-sm avatar-rounded">
                                    <img
                                      src="dist/img/avatar5.jpg"
                                      alt="user"
                                      class="avatar-img"
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="user-name">Jaquiline Joker</div>
                                </div>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="customCheck8"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                      <button
                        type="button"
                        class="btn flex-fill btn-light flex-1"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn flex-fill btn-primary flex-1"
                      >
                        Invite for chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Invite People --> */}
            </div>
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default ChatContent;
