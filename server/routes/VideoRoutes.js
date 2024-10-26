import express from "express";
import { tokenAuthenticator } from "../middleware/tokenAuthenticator.js";
import {
  getVideoById,
  getVideos,
  getVideosByChannel,
  uploadVideo,
} from "../controller/VideoController.js";

const router = express.Router();

router.post("/upload", tokenAuthenticator, uploadVideo);

router.get("/:videoId", getVideoById);

router.get("/", getVideos);

router.get("/channel/:channelId", getVideosByChannel);

export default router;
