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
    default:
      "https://th.bing.com/th/id/OIP.xfgwOuKzWWPqBN8Rn-pUcAHaHa?pid=ImgDet&rs=1",
    required: false,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "blogs", required: true }],
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
