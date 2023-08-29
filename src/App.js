import Header from "./components/Header";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Blog from "./components/Blog";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/myblogs" element={<UserBlog />} />
          <Route path="/myblogs/:id" element={<BlogDetail />} />
          <Route path="/myblogs/add" element={<AddBlog />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
