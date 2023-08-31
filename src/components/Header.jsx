import {
  AppBar,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authAction } from "../store";
import { Brightness4, DarkMode, Menu } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const Header = ({toggleTheme, isDarkMode}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLogged = useSelector((state) => state.isLogged);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

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
        {/* Mobile menu */}
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
                bgcolor: theme.palette.action.hover,
                // minWidth: "200px", // Adjust as needed
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow
              }}
            >
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
                <STab component={Link} to="/blog/add" label="Add Blogs" />
              </Tabs>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
