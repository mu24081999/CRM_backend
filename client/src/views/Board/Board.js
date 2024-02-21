import React from "react";
import Layout from "../layout/Layout";
import BoardContent from "./BoardContent";

const Board = () => {
  return (
    <div>
      <Layout component={<BoardContent />} />
    </div>
  );
};

export default Board;
