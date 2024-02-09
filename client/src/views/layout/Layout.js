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
      class="hk-wrapper"
      data-layout="vertical"
      data-layout-style="collapsed"
      data-menu="light"
      data-footer="simple"
      data-hover="active"
    >
      <TopNavbar />
      <VerticalNavbar />
      <div id="hk_menu_backdrop" className="hk-menu-backdrop"></div>

      <ChatPopup />
      {component}
    </div>
  );
};

export default Layout;
