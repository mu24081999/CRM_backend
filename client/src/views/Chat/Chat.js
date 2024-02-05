import React from "react";
import Layout from "../layout/Layout";
import ChatContent from "./ChatContent";

const Chat = () => {
  return (
    <div>
      <Layout component={<ChatContent />} />
    </div>
  );
};

export default Chat;
