import styled from "@emotion/styled";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../store";

export const color = {
  main: "#fff",
  second: "#353535",
  hover: "#000",
};

const StyledTab = styled(Tab)({
  "&.Mui-selected": {
    color: color.second,
  },
});

const Header = () => {
  const dispath = useDispatch();
  const [value, setValue] = useState(0);
  const isLogged = useSelector((state) => state.isLogged);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar sx={{ background: color.main, position: "sticky" }}>
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", fontWeight: "bold" }}
          color={color.hover}
        >
          BlogApp
        </Typography>
        {isLogged && (
          <Box display={"flex"} marginLeft={"auto"}>
            <Tabs
              TabIndicatorProps={{
                style: { backgroundColor: color.second, color: color.second },
              }}
              value={value}
              onChange={handleTabChange}
            >
              <StyledTab component={Link} to="/" label="All Blogs" />
              <StyledTab component={Link} to="/myblogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display={"flex"} marginLeft={"auto"}>
          {!isLogged && (
            <Button
              component={Link}
              to="/auth"
              variant="outlined"
              sx={{
                margin: 1,
                borderColor: color.second,
                color: color.second,
                "&:hover": { backgroundColor: color.hover, color: color.main },
              }}
            >
              Login
            </Button>
          )}
          {isLogged && (
            <Button
              onClick={() => dispath(authAction.logout())}
              component={Link}
              to="/auth"
              variant="contained"
              sx={{
                margin: 1,
                background: color.second,
                color: color.main,
                "&:hover": { backgroundColor: color.hover, color: color.main },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
