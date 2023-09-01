import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";

const STextField = styled(TextField)({
  margin: "0.5em",
});

const AddBlog = () => {
  const theme = useTheme();
  const userId = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

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
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(BASE_URL + "/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

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
          Please <Link to="/auth">Login</Link> To Create a Blog
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            maxWidth={400}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={"1px 5px 5px 5px rgba(0, 0, 0, 0.1)"}
            padding={3}
            margin={"auto"}
            marginTop={15}
            borderRadius={5}
            bgcolor={theme.palette.primary.form}
          >
            <Typography variant="h3" textAlign={"center"} padding={3}>
              Add Blog
            </Typography>
            <STextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
              placeholder="title"
              required
            />
            <STextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              placeholder="description"
              required
            />
            <STextField
              onChange={handleChange}
              name="image"
              value={inputs.image}
              placeholder="image"
              required
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
              Add
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};

export default AddBlog;
