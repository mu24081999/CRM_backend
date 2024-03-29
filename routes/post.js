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
router.post(
  "/add-post",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addPost
);
router.get(
  "/get-posts",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getPosts
);
router.delete(
  "/delete-post/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deletePost
);
router.get(
  "/post-details/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readPost
);
router.put(
  "/post-update/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updatePost
);

module.exports = router;
