import React, { useEffect, useState } from "react";
import API from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [programs, setPrograms] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: null,
  });
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchPrograms();
    fetchMembers();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await API.get("/programs");
      setPrograms(res.data);
    } catch {
      setMsg("❌ Error fetching programs");
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data);
    } catch {
      setMsg("❌ Error fetching members");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("location", form.location);
      if (form.image) formData.append("image", form.image);

      let res;

      if (editId) {
        res = await API.put(`/programs/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.post("/programs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setMsg(res.data.message || "✅ Program saved!");

      setForm({ title: "", description: "", date: "", location: "", image: null });
      setPreview("");
      setEditId(null);
      fetchPrograms();

    } catch (err) {
      console.log("Save Error:", err);
      setMsg("❌ Failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  const handleEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      date: p.date.split("T")[0],
      location: p.location,
      image: null,
    });
    setPreview(p.image || "");
    setEditId(p._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await API.delete(`/programs/${id}`);
        setMsg("🗑️ Program deleted successfully");
        fetchPrograms();
      } catch {
        setMsg("❌ Failed to delete program");
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h2>🧘‍♀️ Admin Dashboard</h2>
        <p className="subtitle">Manage programs, locations, members & images</p>

        {msg && <p className="message">{msg}</p>}

        {/* ✅ FORM */}
        <form className="program-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="Program Title" value={form.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" rows="3" value={form.description} onChange={handleChange} required />
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Program Location" value={form.location} onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          {preview && (
            <div className="image-preview">
              <img src={preview.startsWith("/uploads") ? `https://gmkv-backend.onrender.com${preview}` : preview} alt="Preview" />
            </div>
          )}

          <button type="submit">{editId ? "Update Program ✏️" : "Add Program ➕"}</button>
        </form>

        {/* ✅ PROGRAM LIST */}
        <h3 className="program-heading">🌼 All Programs</h3>
        <div className="program-list">
          {programs.length === 0 ? (
            <p className="no-programs">No programs added yet</p>
          ) : (
            programs.map((p) => (
              <div key={p._id} className="program-item">
                <div className="program-details">
                  {p.image && <img src={`https://gmkv-backend.onrender.com${p.image}`} alt={p.title} className="program-photo" />}
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    <span><strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</span><br />
                    <span><strong>Location:</strong> {p.location}</span>
                  </div>
                </div>

                <div className="program-actions">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ✅ MEMBERS TABLE */}
        <h3 className="program-heading">👥 Registered Members</h3>
        <div className="members-table">
          {members.length === 0 ? (
            <p className="no-programs">No members registered yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m._id}>
                    <td>{m.name}</td>
                    <td>{m.phone}</td>
                    <td>{m.email}</td>
                    <td>{m.designation || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
