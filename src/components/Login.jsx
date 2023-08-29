import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { color } from "./Header";

const STextField = styled(TextField)({
  margin: "0.5em", 
  
});

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <form>
        <Box
          maxWidth={400}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3} textAlign={"center"}>
            Login
          </Typography>
          {isSignUp && <STextField placeholder="Name" />}
          <STextField type="email" placeholder="Email" />
          <STextField type="password" placeholder="Password" />
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
              background: color.second,
              "&:hover": {
                background: color.hover,
                color: color.main,
              },
            }}
          >
            {isSignUp ? "Sign in" : "Login"}
          </Button>
          <Typography sx={{ borderRadius: 3, marginTop: 3, textTransform: 'capitalize' }}>
            {isSignUp ?  "already have account? " : "doesn't have account? "}
            <Link onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "login" : "sign Up"}
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;
