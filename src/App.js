import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/Blog";
import UserBlog from "./components/UserBlog";
import AddBlog from "./components/AddBlog";
import { darkTheme, lightTheme } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import UserSetting from "./pages/UserSetting";

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
