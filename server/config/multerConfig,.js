import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "channelAvatars",
    allowed_formats: ["jpeg", "png", "jpg", "webp", "gif"],
  },
});

const upload = multer({ storage });

export default upload;
