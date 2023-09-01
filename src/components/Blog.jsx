import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./../config";
import BlogCard from "./card/BlogCard";
import { Typography } from "@mui/material";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const [fetchData, setFetchData] = useState(true);

  const sendRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/blog");
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataRefresh = () => {
    setFetchData(true);
  };

  useEffect(() => {
    if (fetchData) {
      sendRequest().then((data) => {
        setBlogs(data.blogs);
        setFetchData(false); // Set to false after the initial fetch
      });
    }
  }, [fetchData]);

  return (
    <>
      {blogs.length === 0 ? (
        <Typography variant="h4" textAlign={"center"} mt={30}>
          NO BLOG FOUND
        </Typography>
      ) : (
        blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            userId={userId === blog.user._id}
            blogId={blog._id}
            userName={blog.user.name}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            key={index}
            handle={handleDataRefresh}
          />
        ))
      )}
    </>
  );
};

export default Blog;
