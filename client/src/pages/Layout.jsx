import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { X, Menu } from 'lucide-react'
import { SignIn, useUser } from '@clerk/clerk-react'
import Sidebar from '../components/Sidebar'  
import './Layout.css'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUser()

  return user ? (
    <div className="layout">
      <nav className="navbar-Layout">
        <img
          className="logo"
          src={assets.logos}
          alt="Logo"
          onClick={() => navigate('/')}
        />
        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="icon mobile-only" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="icon mobile-only" />
        )}
      </nav>

      
      <div className="main">
        
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="signin-container">
      <SignIn />
    </div>
  )
}

export default Layout
