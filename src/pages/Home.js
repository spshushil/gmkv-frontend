import React, { useEffect, useState } from "react";
import API from "../api";
import ProgramCard from "../components/ProgramCard";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import headImg from "../assets/head.jpg";
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import member4 from "../assets/member4.jpg";


export default function Home() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    API.get("/programs")
      .then((res) => setPrograms(res.data))
      .catch(() => console.log("Error fetching programs"));
  }, []);
  
  return (
    <div className="home-page">
      <div className="overlay">
        <section className="section welcome-section">
  <h1 className="title">Welcome to GMKV Yoga Trust 🧘‍♀️</h1>

  {/* ✅ Typing Animation Added Here */}
  <TypeAnimation
  sequence={[
    "வாழ்க வையகம்",
    2000,
    "வாழ்க வளமுடன்",
    2000,
    "குரு வாழ்க குருவே துணை",
    2000,
  ]}
  wrapper="h2"
  speed={50}
  repeat={Infinity}
  className="typing-line"
/>

  <p className="subtitle">
    Discover the power of yoga — uniting body, mind, and soul.
    Join our sessions to rejuvenate your spirit and embrace a balanced life.
  </p>

  <a href="#about" className="scroll-btn">↓ Scroll Down</a>
</section>
{/* 🧘‍♂️ Programs Section */}
        <section className="section program-section" id="programs">
          <h2 className="section-title">Upcoming Yoga Programs</h2>
          <p className="about-text">
            🔥 Simplified Kundalini Yoga (SKY)<br />
            Foundational course <br />
            🌄 Morning Pranayama & Meditation Sessions<br />
            🧘‍♀️ Evening Yoga Classes<br />
            💫 Mind Power & Self-Realization Workshop<br />
          </p>
          {programs.length > 0 ? (
            <div className="program-list">
              {programs.map((p) => (
                <ProgramCard key={p._id} program={p} />
              ))}
            </div>
          ) : (
            <p className="no-programs"></p>
          )}
        </section>


        {/* 🌸 About Section */}
        <section className="section about-section" id="about">
          <h2 className="section-title">About GMKV Yoga Trust</h2>
          <p className="about-text">
            GMKV Yoga Trust, inspired by the teachings of the World Community Service Centre (WCSC),
            promotes holistic living through yoga and meditation. Our mission is to bring peace and
            harmony to every individual by helping them balance their body, mind, and soul.
          </p>
        </section>

        
        {/* 🕉️ Trust Members Section */}
<section className="section trust-section" id="trust">
  <h2 className="section-title">Our Trust Members</h2>
  <div className="trust-members">
    {[
      {
        name: "Thiru. K. Murugavel",
      role: "President",
      img: headImg,
      phone: "+91 9865108087",
      quote:
        "Spreading the light of yoga and peace among every soul.",
      },
      {
        name: "Thiru. N. Jayapragasa Arvind",
      role: "Secretary",
      img: member1,
      phone: "+91 9791290027",
      quote:
        "Guiding individuals toward harmony and mindful living.",
      },
      {
        name: "Thiru. T. Jayakanthan",
      role: "Treasurer",
      img: member2,
      phone: "+91 9150823945",
      quote:
        "Organizing sessions that nurture both body and mind.",
      },
      {
        name: "Thirumathi. V. Sarala",
      role: "Program Officer (PO)",
      img: member3,
      phone: "+91 8300170282",
      quote:
        "Encouraging a balanced and joyful lifestyle through yoga.",
      },
      {
        name: "Thirumathi. V. Mahalakshmi",
      role: "Public Relations Officer (PRO)",
      img: member4,
      phone: "+91 9442787991",
      quote:
        "Building a connected community inspired by yoga values.",
      },
    ].map((member, index) => (
      <div key={index} className="member-card">
        <img src={member.img} alt={member.name} className="member-img" />
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p className="member-quote">"{member.quote}"</p>
        <a href={`tel:${member.phone}`} className="call-btn">
          📞 Call Now
        </a>
      </div>
    ))}
  </div>
</section>


        {/* 📍 Head Office Location */}
        <section className="section location-section" id="location">
          <h2 className="section-title">Head Office Location</h2>
          <p className="location-text">
            <strong>Gudiyatham arivu thirkovil</strong><br />
            No.3/44, RS Road, Vedhathiri Nagar,<br />
            Ammangkuppam, Gudiyatham, Vellore District – 635803,<br />
            Tamil Nadu, India<br />
            <a href="tel:+918300170282">📞 +91 8300170282</a> | <a href="mailto:gmkvtrust@gmail.com">✉️ gmkvtrust@gmail.com</a>
          </p>

          <a
            href="https://maps.app.goo.gl/anwVKFLfAC4zPmWK9"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
          >
            🗺️ View on Google Maps
          </a>
        </section>

        {/* 🌻 Footer Section */}
        <footer className="footer">
          <div className="footer-content">
            <p>
              © {new Date().getFullYear()} <strong>GMKV Yoga Trust</strong> — All Rights Reserved.
            </p>
            <p className="footer-subtext">
              Inspired by the principles of <strong>WCSC, Aliyar</strong> | Designed with ❤️ by the GMKV Team.
            </p>
            <div className="footer-links">
              <a href="#location">Location</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
