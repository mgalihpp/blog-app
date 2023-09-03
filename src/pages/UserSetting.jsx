import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import Cookies from "js-cookie";

const STextField = styled(TextField)({
  margin: "0.5em",
  width: "100%",
});

const UserSetting = () => {
  const theme = useTheme();
  const userId = Cookies.get("userId");
  const [user, setuser] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    avatar: "",
    email: "",
  });

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const SInputLabel = styled(InputLabel)({
    marginRight: "auto",
    color: theme.palette.text.primary,
    fontSize: "1em",
  });

  const fetchuserById = async () => {
    try {
      const res = await axios.get(BASE_URL + `/api/user/${userId}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchuserById().then((data) => {
      setuser(data.user);
      if (data.user) {
        setInputs({
          name: data.user.name,
          avatar: data.user.avatar,
          email: data.user.email,
        });
      }
    });
  }, [userId]);

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
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.put(BASE_URL + `/api/user/update/${userId}`, {
        name: inputs.name,
        avatar: inputs.avatar,
        email: inputs.email,
        user: userId,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
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
          <Typography variant="h5" marginBottom={5}>
            Edit User
          </Typography>
          <SInputLabel>Username :</SInputLabel>
          <STextField
            onChange={handleChange}
            name="name"
            value={inputs.name}
            placeholder="Username"
          />
          <SInputLabel>Avatar (URL) :</SInputLabel>
          <STextField
            onChange={handleChange}
            name="avatar"
            value={inputs.avatar}
            placeholder="avatar"
          />
          <SInputLabel>email :</SInputLabel>
          <STextField
            onChange={handleChange}
            name="email"
            value={inputs.email}
            placeholder="email"
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
          <AlertTitle>Success Update User</AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default UserSetting;
