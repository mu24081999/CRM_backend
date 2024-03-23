const express = require("express");
const router = express.Router();
const {
  addPost,
  getPosts,
  deletePost,
  readPost,
  updatePost,
} = require("../controllers/posts");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/add-post", IsAuth, addPost);
router.get("/get-posts", IsAuth, getPosts);
router.delete("/delete-post/:post_id", IsAuth, deletePost);
router.get("/post-details/:post_id", IsAuth, readPost);
router.put("/post-update/:post_id", IsAuth, updatePost);

module.exports = router;
