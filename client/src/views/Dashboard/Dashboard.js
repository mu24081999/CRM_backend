// import React, { useEffect } from "react";
// import TopNavbar from "../../components/TopNavbar/TopNavbar";
// import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
// import ChatPopup from "../../components/ChatPopup/ChatPopup";
// import DashboardContent from "./DashboardContent";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// const Dashboard = () => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const redirectTo = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       redirectTo("/sign-in");
//     }
//   }, [isAuthenticated, redirectTo]);
//   return (
//     <div
//       className="hk-wrapper"
//       data-layout="vertical"
//       data-layout-style="default"
//       data-menu="light"
//       data-footer="simple"
//     >
//       <TopNavbar />
//       <VerticalNavbar />
//       <ChatPopup />
//       <DashboardContent />
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import Layout from "../layout/Layout";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  return <Layout component={<DashboardContent />} />;
};

export default Dashboard;
