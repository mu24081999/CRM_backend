import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { createBrowserRouter } from "react-router-dom";

import SignIn from "./views/Auth/SignIn";
import Dashboard from "./views/Dashboard/Dashboard";
import SignUp from "./views/Auth/SignUp";
import ResetPassword from "./views/Auth/ResetPassword";
import VerifyPassword from "./views/Auth/VerifyPassword";
import ResetUserPassword from "./views/Auth/ResetUserPassword";
import Chat from "./views/Chat/Chat";
import Contacts from "./views/Contacts/Contacts";
import Test from "./views/Test/Test";
import ContactDetails from "./views/Contacts/components/ContactDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "contacts",
    element: <Contacts />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "reset-password-verification/:email",
    element: <VerifyPassword />,
  },
  {
    path: "edit-contact/:contactId",
    element: <ContactDetails />,
  },
  {
    path: "reset-password/:email",
    element: <ResetUserPassword />,
  },
  {
    path: "/chats",
    element: <Chat />,
  },
]);

export default router;
