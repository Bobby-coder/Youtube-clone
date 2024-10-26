import Comment from "../model/comment.js";

export const getComments = async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ video: videoId });

    if (comments.length === 0) {
      return res.status(404).json({ error: "No comments found" });
    }

    res.status(200).json({ success: true, comments: comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const user = req.user;
    const { text } = req.body;
    const video = await Video.findById(videoId);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }
    console.log("videoId:", videoId);

    const newComment = new Comment({
      text,
      video: videoId,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
    });
    console.log(newComment);
    await newComment.save();
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    await comment.deleteOne(); //deleting the comment
    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
