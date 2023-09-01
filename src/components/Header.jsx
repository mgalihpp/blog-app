import {
  AppBar,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { authAction } from "../store";
import { Brightness4, DarkMode, Menu } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Cookies from "js-cookie";

const Header = ({ toggleTheme, isDarkMode }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLogged = useSelector((state) => state.isLogged);
  const userId = Cookies.get("userId");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const location = useLocation();
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/myblogs":
        setValue(1);
        break;
      case "/blogs/add":
        setValue(2);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location.pathname]);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const STab = styled(Tab)`
    color: ${({ theme }) => theme.palette.text.primary};

    &.Mui-selected {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  `;

  return (
    <AppBar sx={{ position: "sticky" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", fontWeight: "bold" }}
          color={theme.palette.text.primary}
        >
          BlogApp
        </Typography>
        {/* ... (desktop tabs and login/logout button) */}
        {!isSmallScreen && (
          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <Brightness4 /> : <DarkMode />}
            </IconButton>
            {userId && (
              <Tabs
                value={value}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    background: theme.palette.action.active,
                    color: theme.palette.action.active,
                  },
                }}
              >
                <STab component={Link} to="/" label="All Blogs" />
                <STab component={Link} to="/myblogs" label="My Blogs" />
                <STab component={Link} to="/blogs/add" label="Add Blogs" />
              </Tabs>
            )}
            {!isLogged ? (
              <Button
                component={Link}
                to="/auth"
                variant="outlined"
                sx={{
                  margin: 1,
                  border: 1,
                  borderColor: theme.palette.hover,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: theme.palette.hover,
                    color: theme.palette.background.default,
                  },
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => dispatch(authAction.logout())}
                component={Link}
                to="/auth"
                variant="contained"
                sx={{
                  margin: 1,
                  border: 1,
                  borderColor: theme.palette.hover,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: theme.palette.hover,
                    color: theme.palette.background.default,
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        )}
        {/* Mobile menu */}
        {isSmallScreen && (
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <Brightness4 /> : <DarkMode />}
            </IconButton>
            <IconButton onClick={handleMobileMenuOpen}>
              <Menu />
            </IconButton>
            {mobileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  right: 0, // Align to the right
                  display: "flex",
                  flexDirection: "column", // Display in column layout
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  color: "black",
                  zIndex: 1,
                  bgcolor: theme.palette.toggle,
                  // minWidth: "200px", // Adjust as needed
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow
                }}
              >
                {userId && (
                  <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                      style: {
                        background: theme.palette.action.active,
                        color: theme.palette.action.active,
                      },
                    }}
                  >
                    <STab component={Link} to="/" label="All Blogs" />

                    <STab component={Link} to="/myblogs" label="My Blogs" />
                    <STab component={Link} to="/blogs/add" label="Add Blogs" />
                  </Tabs>
                )}
                <Box>
                  {!isLogged ? (
                    <Button
                      component={Link}
                      to="/auth"
                      variant="outlined"
                      sx={{
                        margin: 1,
                        border: 1,
                        borderColor: theme.palette.hover,
                        color: theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor: theme.palette.hover,
                          color: theme.palette.background.default,
                        },
                      }}
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatch(authAction.logout())}
                      component={Link}
                      to="/auth"
                      variant="contained"
                      sx={{
                        margin: 1,
                        border: 1,
                        borderColor: theme.palette.hover,
                        color: theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor: theme.palette.hover,
                          color: theme.palette.background.default,
                        },
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
