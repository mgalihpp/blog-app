import mongoose from "mongoose";
import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";
import BlogModel from "../models/Blog.js";

export const addComment = async (req, res, next) => {
  const { text, userId, blogId } = req.body;
  let existingUser;
  let userBlog;
  try {
    existingUser = await UserModel.findById(userId);
  } catch (error) {
    console.error(error);
  }
  try {
    userBlog = await BlogModel.findById(blogId);
  } catch (error) {
    console.error(error);
  }
  if (!userBlog) {
    return res.status(400).json({ message: "Unable to find blog by this id" });
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }
  const newComment = new CommentModel({
    text,
    userId,
    blogId,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newComment.save({ session });
    existingUser.comment.push(newComment);
    userBlog.comment.push(newComment);
    await existingUser.save({ session });
    await userBlog.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newComment });
};

export const getCommentByBlogId = async (req, res, next) => {
  const blogId = req.params.id;

  let blog;
  try {
    blog = await BlogModel.findById(blogId).populate({
      path: "comment",
      populate: {
        path: "userId",
        select: "_id name avatar",
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to find blog by this id" });
  }
  return res.status(200).json({ blog });
};
