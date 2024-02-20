import React, { useState } from "react";
import Boards from "./Boards";
import Members from "./Members";

const BoardList = ({ toggleType }) => {
  return (
    <div className="tab-content">
      {toggleType === "board" && <Boards />}
      {toggleType === "team" && <Members />}
    </div>
  );
};

export default BoardList;
