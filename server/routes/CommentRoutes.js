import express from "express";
import { tokenAuthenticator } from "../middleware/tokenAuthenticator.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controller/CommentController.js";

const router = express.Router();

router.post("/create/:videoId", tokenAuthenticator, createComment);

router.delete("/delete/:commentId", tokenAuthenticator, deleteComment);

router.get("/:videoId", getComments);

export default router;
