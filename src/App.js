import Header from "./components/header/Header";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Blog from "./pages/Blog";
import UserBlog from "./pages/UserBlog";
import AddBlog from "./pages/AddBlog";
import { darkTheme, lightTheme } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import UserSetting from "./pages/UserSetting";
import BlogDetail from "./components/blog/BlogDetail";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    Cookies.get("theme") === "dark" ? true : false
  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    Cookies.set("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

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
            <Route path="/blogs/:blogId" element={<BlogDetail />} />
            <Route path="/myblogs" element={<UserBlog />} />
            <Route path="/myblogs/:id" element={<UserBlog />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/user/settings" element={<UserSetting />} />
          </Routes>
        </main>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
