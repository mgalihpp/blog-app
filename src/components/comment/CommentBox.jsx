import { useTheme } from "@emotion/react";
import { Box, Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { BASE_URL } from "../../config";

const CommentBox = ({ blogId, handler }) => {
  const theme = useTheme();
  const [inputs, setInputs] = useState({
    text: "",
  });

  const userId = Cookies.get("userId");
  const blog_Id = blogId;

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/api/blog/addcomment/${blog_Id}`,
        {
          text: inputs.text,
          userId: userId,
          blogId: blog_Id,
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      await handler();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Divider variant="fullWidth" sx={{ marginY: 3 }} />
      <form
        onSubmit={handlePost}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <TextField
            onChange={handleChange}
            name="text"
            value={inputs.text}
            placeholder="add comment..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                },
              },
              width: "100%",
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: theme.palette.textfield,
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              border: 1,
              borderColor: theme.palette.hover,
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.hover,
                color: theme.palette.background.default,
              },
            }}
          >
            POST
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CommentBox;
