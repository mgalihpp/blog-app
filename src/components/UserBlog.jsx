import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import BlogCard from "./card/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + `/api/blog/user/${id}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  });
  console.log(blogs);

  return (
    <div>
      {blogs.map((blog, index) => (
        <BlogCard
          userName={blog.user.name}
          title={blog.title}
          description={blog.description}
          imageUrl={blog.image}
          key={index}
        />
      ))}
    </div>
  );
};

export default UserBlog;
