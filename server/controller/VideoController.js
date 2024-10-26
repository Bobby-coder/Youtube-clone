import Channel from "../model/channel.js";
import Video from "../model/video.js";

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    if (videos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No videos found" });
    }
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, thumbnailUrl, assetUrl, category } = req.body;
    const { user } = req;
    let channel = user.channels[0];
    if (!channel) {
      channel = await Channel.findOne({ owner: user._id });
    }

    const video = new Video({
      title,
      description,
      thumbnailUrl,
      assetUrl,
      category,
      channel: {
        _id: channel._id,
        name: channel.name ? channel.name : channel.channelName,
        avatar: channel.avatar,
      },
    });

    await video.save();
    res.status(201).json({
      message: "Video uploaded successfully",
      success: true,
      video,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to upload video",
      error: error.message,
    });
  }
};

export const getVideosByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const videos = await Video.find({ "channel._id": channelId });
    if (videos.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No videos found" });
    }
    res.status(200).json({ success: true, videos: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
