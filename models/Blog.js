import mongoose, { mongo } from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    comment: [{
        type: mongoose.Types.ObjectId,
        ref: "comments",
        required: false
    }]
})

const BlogModel = mongoose.model("blogs", BlogSchema);

export default BlogModel;