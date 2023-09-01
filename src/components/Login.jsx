import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "./../store/index";
import { BASE_URL } from "../config";
import { useTheme } from "@emotion/react";

const STextField = styled(TextField)({
  margin: "0.5em",
});

const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const backLogin = () => {
    setSignedUp(false);
    setIsSignUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      try {
        await sendRequest("signup");
        setSignedUp(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = await sendRequest();
        localStorage.setItem("userId", data.users._id);
        dispath(authAction.login());
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(BASE_URL + `/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!signedUp ? (
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
            marginTop={20}
            borderRadius={5}
            bgcolor={theme.palette.primary.form}
          >
            <Typography variant="h3" padding={3} textAlign={"center"}>
              Login
            </Typography>
            {isSignUp && (
              <STextField
                name="name"
                onChange={handleChange}
                value={inputs.name}
                placeholder="Name"
                required
              />
            )}
            <STextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type="email"
              placeholder="Email"
              required
            />
            <STextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type="password"
              placeholder="Password"
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
              {isSignUp ? "Sign in" : "Login"}
            </Button>
            <Typography
              sx={{
                borderRadius: 3,
                marginTop: 3,
                textTransform: "capitalize",
              }}
            >
              {isSignUp ? "already have account? " : "doesn't have account? "}
              <Link onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "login" : "sign Up"}
              </Link>
            </Typography>
          </Box>
        </form>
      ) : (
        <form style={{ height: "100vh" }}>
          <Box
            maxWidth={400}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            boxShadow={`10px 10px 20px rgba(0, 0, 0, 0.1)`}
            padding={3}
            margin={"auto"}
            marginTop={5}
            borderRadius={5}
          >
            <Typography variant="h5" textAlign="center">
              Signed up successfully! Please{" "}
              <Link to="/auth" onClick={backLogin}>
                Login
              </Link>
              .
            </Typography>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Login;
