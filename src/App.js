import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import MemberRegister from "./pages/MemberRegister";
import Navbar from "./components/Navbar";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/member/register" element={<MemberRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
