import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Emails from "../Emails/Emails";
import ComposeEmail from "../ComposeEmail/ComposeEmail";
import AddCategory from "../AddCategory/AddCategory";

const EmailContent = () => {
  return (
    <>
      {/* <!-- Main Content --> */}
      <div class="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div class="hk-pg-body py-0">
          <div class="emailapp-wrap">
            <Sidebar />
            <Emails />
            {/* <!-- Compose email --> */}
            <ComposeEmail />
            {/* <!-- /Compose email --> */}

            {/* <!-- Add Category --> */}
            <AddCategory />
            {/* <!-- /Add Category --> */}
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </>
  );
};

export default EmailContent;
