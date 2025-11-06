import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuth } from "../api";
import "./AdminLogin.css"; // 👈 add this file

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/admin-login", form);
      const token = res.data.token;
      localStorage.setItem("gmkv_admin_token", token);
      setAuth(token);
      nav("/admin/dashboard");
    } catch {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h2>🧘‍♂️ Admin Login</h2>
        <p className="subtitle">Welcome back, please login to continue</p>
        {err && <p className="error">{err}</p>}
        <form onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
