import mongoose from "mongoose";
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "music",
        "gaming",
        "news",
        "sports",
        "technology",
        "education",
        "entertainment",
        "comedy",
        "other",
      ],
    },
    channel: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    dislikedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    shares: {
      type: Number,
      default: 0,
    },
    assetUrl: {
      type: String,
      default: "",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
