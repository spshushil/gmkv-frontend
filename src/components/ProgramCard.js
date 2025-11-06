import React from "react";
import "./ProgramCard.css";

export default function ProgramCard({ program }) {
  return (
    <div className="program-card">
      <img
        src={
          program.image
            ? `https://gmkv-backend.onrender.com${program.image}`
            : "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1000&q=80"
        }
        alt={program.title}
        className="program-image"
      />

      <div className="program-content">
        <h3 className="program-title">{program.title}</h3>
        <p className="program-description">{program.description}</p>
        <p className="program-date"><strong>Date:</strong> {program.date}</p>
        <p className="program-location"><strong>Location:</strong> {program.location}</p>
      </div>
    </div>
  );
}
