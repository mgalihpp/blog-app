import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await UserModel.find();
  } catch (error) {
    console.error(error);
  }
  if (!users) {
    return res.status(404).json({ message: "no users found" });
  }
  return res.status(200).json({ users });
};

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  try {
    user = await UserModel.findById(userId).select("-password");
  } catch (error) {
    console.error(error);
  }
  if (!user) {
    return res.status(404).json({ message: "error user not found" });
  }
  return res.status(200).json({ user });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await UserModel.findOne({ email });
  } catch (error) {
    console.error(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exits! Login instead" });
  }
  const hashPassword = bcrypt.hashSync(password);
  const newUser = new UserModel({
    name,
    email,
    password: hashPassword,
    blogs: [],
  });

  try {
    newUser.save();
  } catch (error) {
    console.error(error);
  }
  return res.status(201).json({ newUser });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (error) {
    console.error(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldnt find user by this email, please register" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successfull", users: existingUser });
};

export const userEdit = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const userId = req.params.id;
  let existingUser;
  try {
    existingUser = await UserModel.findByIdAndUpdate(userId, {
      name,
      email,
      avatar,
    });
  } catch (error) {
    console.error(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "cannot find user" });
  }
  return res.status(200).json({ existingUser });
};
