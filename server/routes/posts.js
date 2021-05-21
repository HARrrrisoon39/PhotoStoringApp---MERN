import express from "express";
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  likePost,
} from "../controller/posts.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authenticate, createPosts);
router.patch("/:id", authenticate, updatePosts);
router.delete("/:id", authenticate, deletePosts);
router.patch("/:id/likePost", authenticate, likePost);

export default router;
