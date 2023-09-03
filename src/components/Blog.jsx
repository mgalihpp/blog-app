import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./../config";
import BlogCard from "./card/BlogCard";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import SkeletonCard from "./card/SkeletonCard";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("userId");
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
        const reversedBlogs = data.blogs ? data.blogs.reverse() : [];
        setBlogs(reversedBlogs);
        setLoading(false);
        setFetchData(false);
      });
    }
  }, [fetchData]);

  return (
    <>
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : blogs.length === 0 ? (
        <Typography variant="h4" textAlign={"center"} mt={30}>
          NO BLOG FOUND
        </Typography>
      ) : (
        blogs &&
        blogs.map((blog, index) => (
          <BlogCard
            userId={userId === blog.user._id}
            avatar={blog.user.avatar}
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
