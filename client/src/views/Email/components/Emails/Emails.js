import React from "react";
import EmailsHeader from "./components/EmailsHeader";
import EmailsList from "./components/EmailsList";
import EmailDetailsHeader from "./components/EmailDetailsHeader";
import EmailDetails from "./components/EmailDetails";

const Emails = () => {
  return (
    <div class="emailapp-content">
      <div class="emailapp-aside">
        <EmailsHeader />
        <div data-simplebar class="aside-body">
          <form class="aside-search" role="search">
            <input
              type="text"
              class="form-control"
              placeholder="Search inbox"
            />
          </form>
          <EmailsList />
        </div>
      </div>
      <div class="emailapp-single-email">
        <EmailDetailsHeader />
        <EmailDetails />
      </div>
    </div>
  );
};

export default Emails;
