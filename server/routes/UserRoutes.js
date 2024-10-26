import express from "express";
import {
  getUser,
  signin,
  signout,
  signup,
  uploadAvatar,
  uploadBanner,
} from "../controller/UserController.js";
import { tokenAuthenticator } from "../middleware/tokenAuthenticator.js";
import upload from "../config/multerConfig,.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/", tokenAuthenticator, getUser);

router.post("/logout", signout);

router.post("/upload/avatar", upload.single("avatar"), uploadAvatar);

router.post(
  "/upload/banner/:channelId",
  tokenAuthenticator,
  upload.single("banner"),
  uploadBanner
);

export default router;
