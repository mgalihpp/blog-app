import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const STextField = styled(TextField)({
  margin: "0.5em",
  width: "100%",
});

const AddBlog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
        navigate("/myblogs");
      }, 2000);
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
      const data = await res.data;
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
        <form onSubmit={handleSubmit} style={{ position: 'relative'}}>
          <Box
            maxWidth={500}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={"1px 5px 5px 5px rgba(0, 0, 0, 0.1)"}
            padding={3}
            margin={"auto"}
            marginTop={10}
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
              placeholder="image (optional)"
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
          {isAlertOpen && (
            <Alert
              variant="filled"
              severity="success"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: 0,
              }}
            >
              <AlertTitle>Success Add Blog</AlertTitle>
            </Alert>
          )}
        </form>
      )}
    </>
  );
};

export default AddBlog;
