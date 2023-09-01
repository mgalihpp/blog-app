import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import BlogCard from "./card/BlogCard";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const userId = Cookies.get("userId");
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
          setUser(data.users);
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
            userName={user.name}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            avatar={user.avatar}
            handle={handleDataRefresh}
          />
        ))
      )}
    </>
  );
};

export default UserBlog;
