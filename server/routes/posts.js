import express from "express";
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  likePost,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.patch("/:id", updatePosts);
router.delete("/:id", deletePosts);
router.patch("/:id/likePost", likePost);

export default router;
