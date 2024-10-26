import express from "express";
import { tokenAuthenticator } from "../middleware/tokenAuthenticator.js";
import {
  createChannel,
  getChannel,
  getChannelById,
  getChannelByUser,
} from "../controller/ChannelController.js";
import upload from "../config/multerConfig,.js";

const router = express.Router();

router.post(
  "/create",
  tokenAuthenticator,
  upload.single("avatar"),
  createChannel
);

router.get("/:handle", getChannel);

router.get("/", tokenAuthenticator, getChannelByUser);

router.get("/channelbyid/:id", getChannelById);

export default router;
