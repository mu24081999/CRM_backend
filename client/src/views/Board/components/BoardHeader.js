import React from "react";

const BoardHeader = ({ onToggle }) => {
  return (
    <header className="taskboard-header">
      <ul className="nav nav-justified nav-light nav-tabs nav-segmented-tabs active-theme mx-auto w-350p">
        <li className="nav-item">
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            // href="/tab_boards"
            onClick={() => onToggle("board")}
          >
            <span className="nav-link-text">Boards</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="tab"
            // href="/tab_team"
            onClick={() => onToggle("team")}
          >
            <span className="nav-link-text badge-on-text">Team</span>
          </button>
        </li>
      </ul>
      <div className="hk-sidebar-togglable"></div>
    </header>
  );
};

export default BoardHeader;
