import BlogModel from "../models/Blog.js";
import UserModel from "../models/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await BlogModel.find().populate("user");
  } catch (error) {
    console.error(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findById(user);
  } catch (error) {
    console.error(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user by this id" });
  }

  const newBlog = new BlogModel({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newBlog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await BlogModel.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
    });
  } catch (error) {
    console.error(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update blog" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await BlogModel.findById(id);
  } catch (error) {
    console.error(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "no blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await BlogModel.findByIdAndRemove(id).populate("user");
    await UserModel.findByIdAndUpdate(blog.user, {
      $pull: { blogs: blog._id },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to delete" });
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted!" });
};

export const getUserBlogById = async (req, res, next) => {
  const UserId = req.params.id;
  let userBlogs;

  try {
    userBlogs = await UserModel.findById(UserId).populate("blogs");
  } catch (error) {
    console.error(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "user blog not found" });
  }
  return res.status(200).json({ users: userBlogs });
};
