import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import BlogCard from "./card/BlogCard";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");
  const [fetchData, setFetchData] = useState(true);

  const sendRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + `/api/blog/user/${userId}`);
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
    if (fetchData)
      if (userId) {
        sendRequest().then((data) => {
          setUserName(data.users.name);
          setBlogs(data.users.blogs);
          setFetchData(false);
        });
      }
  }, [fetchData]);

  return (
    <>
      {userId === null ? (
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mt: 30,
          }}
        >
          Please <Link to="/auth">Login</Link>
        </Typography>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blogId={blog._id}
            userId={userId === blog.user}
            userName={userName}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            handle={handleDataRefresh}
          />
        ))
      )}
    </>
  );
};

export default UserBlog;
