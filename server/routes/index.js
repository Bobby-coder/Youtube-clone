import express from "express";
import channelRoutes from "./ChannelRoutes.js";
import userRoutes from "./UserRoutes.js";
import commentRoutes from "./CommentRoutes.js";
import videoRoutes from "./VideoRoutes.js";

const router = express.Router();

router.use("/channel", channelRoutes);
router.use("/user", userRoutes);
router.use("/comment", commentRoutes);
router.use("/videos", videoRoutes);

export default router;