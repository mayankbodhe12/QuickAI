import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          Create amazing content <br /> with{" "}
          <span className="highlight">AI tools</span>
        </h1>
        <p>
          Transform your content creation with our suite of premium AI tools. <br />
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="hero-buttons">
        <button onClick={() => navigate("/ai")} className="btn primary-btn">
          Start creating now
        </button>
        <button className="btn secondary-btn">Watch demo</button>
      </div>

      <div className="hero-footer">
        <img src={assets.user_group} alt="users" className="user-icon" />
        Trusted by 10k+ people
      </div>
    </div>
  );
};

export default Hero;
