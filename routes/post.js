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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addPost
);
router.get(
  "/get-posts",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getPosts
);
router.delete(
  "/delete-post/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deletePost
);
router.get(
  "/post-details/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readPost
);
router.put(
  "/post-update/:post_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updatePost
);

module.exports = router;
