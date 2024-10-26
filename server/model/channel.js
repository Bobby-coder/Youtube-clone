import { Schema } from "mongoose";
import mongoose from "mongoose";

const channelSchema = new Schema(
  {
    channelId: {
      type: String,
      required: true,
      unique: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/5.x/initials/svg?seed=${this.channelName}`;
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    channelBanner: {
      type: String,
      default: "",
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
