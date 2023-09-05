import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import BlogCard from "./BlogCard";
import Cookies from "js-cookie";
import Comment from "../comment/Comment";
import { Card, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const BlogDetail = () => {
  const { blogId } = useParams();
  const userId = Cookies.get("userId");
  const [blog, setBlog] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDataRefresh = () => {
    setFetchData(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get(BASE_URL + `/api/blog/${blogId}`);
        const blogData = await blogResponse.data;
        setBlog(blogData.blog);
      } catch (error) {
        console.error(error);
      }
    };
    if (fetchData) {
      if (blogId) {
        fetchData();
        setFetchData(false);
      }
    }
  }, [fetchData]);

  return (
    <>
      {blog.user && (
        <>
          <Card
            sx={{
              maxWidth: "100vw",
              margin: "auto",
              padding: 1,
              border: 0.1,
              borderColor: theme.palette.action.disabled,
              boxShadow: `0px 10px 20px ${theme.palette.secondary.shadow}`,
              "@media (min-width: 768px)": {
                maxWidth: "50vw",
              },
            }}
          >
            <IconButton
              onClick={() => navigate(-1, { replace: true })}
              sx={{ marginBottom: "0.2em" }}
            >
              <ArrowBack />
            </IconButton>
            <BlogCard
              userName={blog.user.name}
              avatar={blog.user.avatar}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.image}
              blogId={blogId}
              userId={userId === blog.user._id}
            />
            <Comment
              blogId={blogId}
              comments={blog.comment}
              handler={handleDataRefresh}
            />
          </Card>
        </>
      )}
    </>
  );
};

export default BlogDetail;
