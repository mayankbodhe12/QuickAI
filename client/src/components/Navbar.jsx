import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Navbar.css";
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useClerk()
  const { openSignIn } = useClerk()

  return (
    <div className="navbar">
      <img
        src={assets.logo}
        alt="logo"
        className="navbar-logo"
        onClick={() => navigate("/")}
      />

      {
        user ? <UserButton />
        :
        (
            <button onClick={openSignIn} className="navbar-btn">
            Get started <ArrowRight className="arrow-icon" />
            </button>
        )
      }

    </div>
  );
};

export default Navbar;
