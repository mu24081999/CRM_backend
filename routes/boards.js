const express = require("express");
const router = express.Router();
const {
  addBoard,
  getBoards,
  deleteBoard,
  readBoard,
  updateBoard,
} = require("../controllers/boards");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-board", IsAuth, addBoard);
router.get("/get-boards", IsAuth, getBoards);
router.delete("/delete-board/:board_id", IsAuth, deleteBoard);
router.get("/board-details/:board_id", IsAuth, readBoard);
router.put("/board-update/:board_id", IsAuth, updateBoard);

module.exports = router;
