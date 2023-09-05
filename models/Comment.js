import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  blogId: { type: mongoose.Types.ObjectId, ref: "blogs", required: true },
  createdAt: { type: Date , default: Date.now},
});

const CommentModel = mongoose.model("comments", commentSchema);

export default CommentModel;
