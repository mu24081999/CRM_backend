import _ from "lodash";
import React, { useState } from "react";

const InvitePeople = ({ users, authUser, socket }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleCheckBoxChange = (itemId) => {
    // Toggle the checked status of the item
    setSelectedUsers((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };
  const generateChatRoomId = (userId1, userId2) => {
    return `${Math.min(userId1, userId2)}_${Math.max(userId1, userId2)}`;
  };
  const createChatRooms = () => {
    Object.entries(selectedUsers).map(([itemId, isChecked]) => {
      if (isChecked) {
        const selectedUser = users?.filter((u) => u.id === _.toInteger(itemId));
        const room_name = generateChatRoomId(authUser?.id, selectedUser[0]?.id);
        const roomData = {
          user_id_1: authUser?.id,
          user_id_2: selectedUser[0]?.id,
          user_name_1: authUser?.name,
          user_name_2: selectedUser[0]?.name,
          user_image_1: authUser?.avatar,
          user_image_2: selectedUser[0]?.avatar,
          name: room_name,
        };
        // socket.emit("joinRoom", { roomId: room_name });

        // Listen for a response from the server

        socket.emit("add-chat-room", roomData);
      }
    });
  };
  return (
    <div>
      {/* <!-- Invite People --> */}
      <div class="modal fade" id="invite_people" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered mw-400p" role="document">
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
                    {users?.length > 0 ? (
                      users?.map((user, index) => (
                        <li key={index}>
                          <div class="media d-flex align-items-center">
                            <div class="media-head me-3">
                              <div class="avatar avatar-sm avatar-rounded">
                                <img
                                  src={user.avatar}
                                  alt="user"
                                  class="avatar-img"
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <div class="user-name">{user.name}</div>
                            </div>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              class="form-check-input"
                              //   id="customCheck2"
                              checked={selectedUsers[user.id] || false}
                              onChange={() => handleCheckBoxChange(user.id)}
                            />
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No users found.</li>
                    )}
                    {/* <li>
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
                    </li> */}
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
                onClick={createChatRooms}
                type="button"
                class="btn flex-fill btn-primary flex-1"
                data-bs-dismiss="modal"
              >
                Invite for chat
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Invite People --> */}
    </div>
  );
};

export default InvitePeople;
