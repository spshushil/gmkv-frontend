import React, { useState } from "react";
import API from "../api";
import "./MemberRegister.css"; // custom styling

export default function MemberRegister() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    phone: "",
    email: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/members", form);
      setMsg("🌸 Member registered successfully!");
      setForm({ name: "", designation: "", phone: "", email: "" });
    } catch (err) {
      setMsg("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="member-register">
      <div className="overlay">
        <div className="register-box">
          <h2>🧘‍♀️ Join GMKV Yoga Trust</h2>
          <p className="subtitle">Become part of our growing yoga community</p>

          {msg && <p className="message">{msg}</p>}

          <form onSubmit={submit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button type="submit">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}
