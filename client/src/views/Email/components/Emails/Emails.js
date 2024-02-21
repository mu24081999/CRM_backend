import React, { useEffect, useState } from "react";
import EmailsHeader from "./components/EmailsHeader";
import EmailsList from "./components/EmailsList";
import EmailDetailsHeader from "./components/EmailDetailsHeader";
import EmailDetails from "./components/EmailDetails";
import { useDispatch, useSelector } from "react-redux";
import { getEmailList } from "../../../../redux/services/email";
import { getUsers } from "../../../../redux/services/users";

const Emails = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { emails } = useSelector((state) => state.email);
  const { users } = useSelector((state) => state.user);
  const [emailData, setEmailData] = useState([]);
  const [emailArray, setEmailArray] = useState([]);
  const [emailsData, setEmailsData] = useState([]);
  const [emailDetails, setEmailDetails] = useState([]);
  const [userData, setUsersData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailList(token));
    dispatch(getUsers(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (emails?.length > 0) {
      const filteredData = emails?.filter((email) => !email.parent_id);
      const data = [];
      emails?.forEach((email) => {
        const sender = userData?.filter(
          (user) => user.email === email.sender
        )[0];
        const reciever = userData?.filter(
          (user) => user.email === email.reciever
        )[0];
        data.push({ ...email, sender, reciever });
      });
      setEmailArray(data);
      setEmailData(filteredData);
    }
  }, [emails, userData]);
  useEffect(() => {
    if (users?.length > 0) {
      setUsersData(users);
    }
  }, [users]);
  useEffect(() => {
    if (emailData?.length > 0 && userData?.length > 0) {
      const data = [];
      const filteredData = emailData?.filter(
        (email) => email.reciever === user.email
      );
      filteredData?.map((email) => {
        const sender = userData?.filter(
          (user) => user.email === email.sender
        )[0];
        const reciever = userData?.filter(
          (user) => user.email === email.reciever
        )[0];
        data.push({ ...email, sender, reciever });
      });

      setEmailsData(data);
    }
  }, [emailData, userData, user]);
  const handleDataFromChild = (data) => {
    setEmailsData(data);
  };
  const handleEmailDetails = (data) => {
    setEmailDetails(data);
  };
  return (
    <div class="emailapp-content">
      <div class="emailapp-aside">
        <EmailsHeader
          emailsData={emailsData}
          authUser={user}
          onDataFromChild={handleDataFromChild}
        />
        <div data-simplebar class="aside-body">
          <form class="aside-search" role="search">
            <input
              type="text"
              class="form-control"
              placeholder="Search inbox"
            />
          </form>
          <EmailsList
            emailsData={emailsData}
            emails={emailArray}
            onEmailDetail={handleEmailDetails}
          />
        </div>
      </div>
      <div class="emailapp-single-email">
        <EmailDetailsHeader />
        <EmailDetails
          emailDetails={emailDetails}
          emailsData={emailsData}
          emails={emailArray}
          onEmailDetail={handleEmailDetails}
        />
      </div>
    </div>
  );
};

export default Emails;
