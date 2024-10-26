import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    }
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
