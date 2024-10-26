import Channel from "../model/channel.js";
import User from "../model/user.js";

export const createChannel = async (req, res) => {
  try {
    const { channelId, channelName, description, avatar, channelBanner } =
      req.body;
    const owner = req.user._id;

    const newChannel = new Channel({
      channelId,
      channelName,
      avatar,
      owner,
      description,
      channelBanner,
    });

    const savedChannel = await newChannel.save();

    if (savedChannel) {
      await User.findByIdAndUpdate(owner, {
        $push: {
          channels: {
            _id: savedChannel._id,
            handle: savedChannel.channelId,
            name: savedChannel.channelName,
            avatar: savedChannel.avatar,
          },
        },
      });
      res.status(201).json({
        success: true,
        message: "Channel created successfully",
        newChannel,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Channel creation failed",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Sorry, this channel handle is already taken",
        error,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getChannel = async (req, res) => {
  try {
    const { handle } = req.params;
    const channel = await Channel.findOne({ channelId: handle });
    if (channel) {
      res.status(200).json({ success: true, channel });
    } else {
      res.status(404).json({ success: false, message: "Channel not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    res.status(200).json({ success: true, channel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChannelByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const channel = await Channel.findOne({ owner: userId });
    if (!channel) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }
    res.status(200).json({ success: true, channel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
