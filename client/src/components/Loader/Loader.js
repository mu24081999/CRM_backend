import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "5%",
        background: "rgb(0,0,0,0.5)",
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
