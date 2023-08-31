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
  
  useEffect(() =>{
    sendRequest().then(data => setBlogs(data.blogs));
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
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

export default Blog;
