import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./../config";
import BlogCard from "./card/BlogCard";

const Blog = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/blog");
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const res = await axios.get(BASE_URL + `/api/user/${userId}`);
      const user = await res.data;
      return user.users.name;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sendRequest().then(async (data) => {
      const blogWithUserName = await Promise.all(
        data.blogs.map( async (blog) => {
          const userName = await fetchUserName(blog.user);
          return {...blog, userName};
        })
      )
      setBlogs(blogWithUserName);
    });
  });

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            userName={blog.userName}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            key={index}
          />
        ))}
    </div>
  );
};

export default Blog;
