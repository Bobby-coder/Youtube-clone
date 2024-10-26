import Channel from "../model/channel.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findById(userid);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        channels: user.channels,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, avatar } = req.body;
    const pwdHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: pwdHash,
      avatar,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        error,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect", success: false });
    }
    const channel = await Channel.findOne({ owner: user._id });

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        channels: user.channels,
        channel,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    if (!token) {
      return res.status(500).json({
        message: "Error occurred while generating token",
        success: false,
      });
    }
    res.cookie("authtoken", token, {
      sameSite: "none",
      credentials: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: false,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export function signout(req, res) {
  res.clearCookie("authtoken", {
    sameSite: "none",
    secure: true,
    Credentials: true,
    domain: "youtube-backend-eight.vercel.app",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
}

export function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = req.file.path;

    if (!fileUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Unable to retrieve file URL" });
    }

    res
      .status(200)
      .json({ success: true, message: "Upload successful", fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
}

export const uploadBanner = async (req, res) => {
  try {
    const { channelId } = req.params;
    const bannerURl = req.file.path;
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res
        .status(404)
        .json({ success: false, message: "Channel not found" });
    }
    channel.channelBanner = bannerURl;
    await channel.save();
    res.status(200).json({
      success: true,
      message: "Banner uploaded successfully",
      channelBanner: bannerURl,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
