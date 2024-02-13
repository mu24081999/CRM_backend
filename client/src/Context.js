import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { updatedMe } from "./redux/slices/auth";
import ringTone from "./assets/ringtone.mp3";

const SocketContext = createContext();
const socket = io("http://localhost:7000");
const ContextProvider = ({ children }) => {
  const { user_id } = useSelector((state) => state.auth);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [openCalling, setOpenCalling] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const dispatch = useDispatch();
  const ringtone = new Audio(ringTone);
  //open dialog
  function clickElementByDataBsTarget(dataBsTarget) {
    var elements = document.querySelectorAll(
      '[data-bs-target="' + dataBsTarget + '"]'
    ); // Get elements with matching data-bs-target value
    if (elements.length > 0) {
      elements.forEach(function (element) {
        element.click(); // Trigger a click event on each matching element
      });
    } else {
      console.error(
        "Element with data-bs-target '" + dataBsTarget + "' not found."
      );
    }
  }
  //close dialog
  function clickElementByDataBsDismiss(dataBsTarget) {
    var elements = document.querySelectorAll(
      '[data-bs-dismiss="' + dataBsTarget + '"]'
    ); // Get elements with matching data-bs-target value
    if (elements.length > 0) {
      elements.forEach(function (element) {
        element.click(); // Trigger a click event on each matching element
      });
    } else {
      console.error(
        "Element with data-bs-target '" + dataBsTarget + "' not found."
      );
    }
  }
  const stopRingtone = () => {
    // setPlaying(false);
    // You can replace 'ringtone.mp3' with the path to your actual ringtone file
    const audio = new Audio(ringTone);
    audio.pause();
    audio.currentTime = 0;
  };
  useEffect(() => {
    if (socket) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        });
      socket.emit("user_connected", user_id);
      socket.on("updated_me", (userData) => {
        dispatch(updatedMe(userData));
      });
      socket.on("me", (id) => setMe(id));
      socket.on("callEnded", () => {
        // setCallEnded(true);
        console.log("🚀 ~ socket.on ~ callEnded:", callEnded);
        // clickElementByDataBsDismiss("modal");
      });
      socket.on("callUser", ({ from, name: callerName, signal }) => {
        clickElementByDataBsTarget("#video_call");
        setRinging(true);
        // ringtone.play();

        ringtone.play();
        setTimeout(() => {
          ringtone.pause();
        }, 3000); //
        setIsCalling(true);
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [user_id, dispatch, callEnded]);
  const calling = () => {
    setOpenCalling(!openCalling);
  };
  const answerCall = () => {
    setCallAccepted(true);
    setRinging(false);
    ringtone.pause();
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id, name) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    socket.on("callAccepted", (signal) => {
      ringtone.pause();

      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = (to) => {
    socket.emit("disconnect_call", { to: to });
    setCallEnded(true);
    ringtone.pause();
    // connectionRef.current = "";
    // window.location.reload();
    clickElementByDataBsDismiss("modal");
  };

  return (
    <SocketContext.Provider
      value={{
        calling,
        call,
        callAccepted,
        openCalling,
        isCalling,
        myVideo,
        userVideo,
        ringing,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { ContextProvider, SocketContext };
