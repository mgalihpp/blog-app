import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: "https://i.pinimg.com/736x/1b/b8/c8/1bb8c82cdad7277dd52ae4d21c7ee292.jpg",
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "blogs", required: true }],
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
