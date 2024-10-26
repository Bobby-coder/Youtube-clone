import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [32, "First Name should be at most 32 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [32, "Last Name should be at most 32 characters long"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxlength: [256, "Email should be at most 256 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should be at least 6 characters long"],
    maxlength: [256, "Password should be at most 256 characters long"],
  },
  avatar: {
    type: String,
    default: function () {
      return `https://api.dicebear.com/5.x/initials/svg?seed=${this.firstName}+${this.lastName}`;
    },
  },
  channels: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
      handle: {
        type: String,
      },
      name: String,
      avatar: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
