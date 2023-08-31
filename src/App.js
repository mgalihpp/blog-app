import Header from "./components/Header";
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/Blog";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { darkTheme, lightTheme } from "./Theme";
import { CssBaseline, ThemeProvider, } from "@mui/material";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  document.body.className = isDarkMode ? "theme-dark" : "theme-light";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/myblogs" element={<UserBlog />} />
            <Route path="/myblogs/:id" element={<BlogDetail />} />
            <Route path="/blog/add" element={<AddBlog />} />
          </Routes>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
