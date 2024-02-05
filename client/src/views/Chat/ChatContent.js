import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChatAside from "./ChatAside";
import SingleChat from "./SingleChat";
import AudioCall from "./AudioCall";
import VideoCall from "./VideoCall";
import InvitePeople from "./InvitePeople";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/services/users";
import io from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";

const ChatContent = () => {
  const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
  //Socket connection
  const socket = useMemo(
    () => io(process.env.REACT_APP_BACKEND_SOCKET_URL_PRODUCTION),
    []
  );
  const [selectedRoom, setSelectedRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  console.log("🚀 ~ ChatCo\\ntent ~ socket:", socket);
  const getRooms = useCallback(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(`${backendURL}/user/chat/get-rooms`, config)
        .then((response) => {
          setRooms(response.data.data.chatRoomsData);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendURL, token]);
  const getChats = useCallback(
    async (room) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .get(
            `${backendURL}/user/chat/chat-history/${room?.user_id_1}/${room?.user_id_2}`,
            config
          )
          .then((response) => {
            setMessages(response.data?.data.chatData);
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token]
  );
  useMemo(() => {
    if (selectedRoom) {
      getChats(selectedRoom);
    }
  }, [getChats, selectedRoom]);
  const getAllChats = useCallback(
    async (room) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        await axios
          .get(`${backendURL}/user/chat/get-chats`, config)
          .then((response) => {
            setAllMessages(response.data?.data.chatData);
          });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [backendURL, token]
  );
  useMemo(() => {
    if (selectedRoom) {
      getChats(selectedRoom);
    }
  }, [getChats, selectedRoom]);
  useEffect(() => {
    if (token) {
      getRooms();
      getAllChats();
      dispatch(getUsers(token));
    }
  }, [token, dispatch, getRooms, getAllChats]);
  useEffect(() => {
    // Listen for incoming messages
    socket.on("message_added", (data) => {
      // setMessages([...messages, data]);
      setMessages(data);
    });
    socket.on("room_added", (data) => {
      setRooms(data);
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);
  const handleDataFromChild = (data) => {
    setSelectedRoom(data);
  };
  return (
    <div>
      {/* <!-- Wrapper --> */}

      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="chatapp-wrap chatapp-info-active">
            <div class="chatapp-content">
              <ChatAside
                socket={socket}
                rooms={rooms}
                authUser={user}
                onDataFromChild={handleDataFromChild}
                messages={allMessages}
              />
              {selectedRoom?.id && (
                <SingleChat
                  messages={messages}
                  selectedRoom={selectedRoom}
                  authUser={user}
                  socket={socket}
                />
              )}
              <AudioCall />
              <VideoCall />
              <InvitePeople users={users} authUser={user} socket={socket} />
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
