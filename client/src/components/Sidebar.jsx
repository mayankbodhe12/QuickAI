import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'   

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className={`sidebar ${sidebar ? 'open' : ''}`}>
      <div className="sidebar-top">
        <img src={user.imageUrl} alt="User avatar" className="avatar-large" />
        <h1 className="username">{user.fullName}</h1>

        <div className="nav-links">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`nav-icon ${isActive ? 'active-icon' : ''}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div onClick={openUserProfile} className="profile-box">
          <img src={user.imageUrl} className="avatar-small" alt="" />
          <div>
            <h1 className="profile-name">{user.fullName}</h1>
            <p className="profile-plan">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{' '}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="logout-icon"
        />
      </div>
    </div>
  )
}

export default Sidebar
