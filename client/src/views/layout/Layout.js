import React, { useEffect } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import ChatPopup from "../../components/ChatPopup/ChatPopup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Layout = ({ component }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const redirectTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      redirectTo("/sign-in");
    }
  }, [isAuthenticated, redirectTo]);
  return (
    <div
      className="hk-wrapper"
      data-layout="vertical"
      data-layout-style="default"
      data-menu="light"
      data-footer="simple"
    >
      <TopNavbar />
      <VerticalNavbar />
      <ChatPopup />
      {component}
    </div>
  );
};

export default Layout;
