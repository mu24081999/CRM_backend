import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader";

import SignIn from "./views/Auth/SignIn";
import Dashboard from "./views/Dashboard/Dashboard";
import SignUp from "./views/Auth/SignUp";
import ResetPassword from "./views/Auth/ResetPassword";
import VerifyPassword from "./views/Auth/VerifyPassword";
import ResetUserPassword from "./views/Auth/ResetUserPassword";
import Chat from "./views/Chat/Chat";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: Loader,
  },
  {
    path: "sign-in",
    element: <SignIn />,
    loader: Loader,
  },
  {
    path: "sign-up",
    element: <SignUp />,
    loader: Loader,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
    loader: Loader,
  },
  {
    path: "reset-password-verification/:email",
    element: <VerifyPassword />,
    loader: Loader,
  },
  {
    path: "reset-password/:email",
    element: <ResetUserPassword />,
    loader: Loader,
  },
  {
    path: "/chats",
    element: <Chat />,
    loader: Loader,
  },
]);

export default router;
