import React from "react";
import { assets } from "../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-about">
          <img className="footer-logo" src={assets.logo} alt="logo" />
          <p>
            Experience the power of AI with QuickAi. <br />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2>Subscribe to our newsletter</h2>
            <p>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="subscribe-box">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
        Copyright 2025 © <strong>Mayank Bodhe</strong>. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
