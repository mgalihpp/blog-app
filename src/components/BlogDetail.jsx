import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

const STextField = styled(TextField)({
  margin: "0.5em",
  width: "100%",
});

const BlogDetail = ({ id, handleOpen, handleClose, handle, handleWhileSubmit }) => {
  const theme = useTheme();
  const blogId = id;
  const [blog, setBlog] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const SInputLabel = styled(InputLabel)({
    marginRight: "auto",
    color: theme.palette.text.primary,
    fontSize: '1em'
  });

  const fetchBlogById = async () => {
    try {
      const res = await axios.get(BASE_URL + `/api/blog/${blogId}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogById().then((data) => {
      setBlog(data.blog);
      if (data.blog) {
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
      }
    });
  }, [blogId]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("success to update blog");
      handleWhileSubmit(false);
      handle();
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async () => {
    const userId = Cookies.get("userId");
    try {
      const res = await axios.put(BASE_URL + `/api/blog/update/${blogId}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog open={handleOpen} onClose={handleClose} fullWidth>
        <DialogTitle textAlign={"center"}>Edit Blog</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={"100%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={"1px 5px 5px 5px rgba(0, 0, 0, 0.1)"}
            padding={3}
            margin={"auto"}
            borderRadius={0}
            bgcolor={theme.palette.primary.form}
          >
            <SInputLabel>Title :</SInputLabel>
            <STextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
              placeholder="title"
              required
            />
            <SInputLabel>Description :</SInputLabel>
            <STextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              placeholder="description"
              required
            />
            <SInputLabel>Image :</SInputLabel>
            <STextField
              onChange={handleChange}
              name="image"
              value={inputs.image}
              placeholder="image"
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                borderRadius: 3,
                marginTop: 3,
                border: 1,
                borderColor: theme.palette.hover,
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.hover,
                  color: theme.palette.background.default,
                },
              }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};

export default BlogDetail;
