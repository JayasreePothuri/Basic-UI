import { useState } from 'react'
import logo from './assets/enterprise-minds-logo.png'
import './Dashboard.css'

const NAV_ITEMS = ['Overview', 'Control', 'Playground', 'Course', 'Use']

export default function Dashboard({ username, onLogout }) {
  const [activeNav, setActiveNav] = useState('Overview')
  const displayName = username.split('@')[0]

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo-wrap">
          <img src={logo} alt="Enterprise Minds" className="dashboard-logo" />
        </div>

        <nav className="dashboard-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveNav(item)}
              className={
                activeNav === item
                  ? 'dashboard-nav-button dashboard-nav-button-active'
                  : 'dashboard-nav-button'
              }
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="dashboard-spacer" />

        <button
          type="button"
          onClick={() => window.alert('Publish is not implemented in this demo.')}
          className="dashboard-action-button dashboard-publish"
        >
          Publish
        </button>
        <button type="button" onClick={onLogout} className="dashboard-action-button">
          Sign out
        </button>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <h1 className="dashboard-topbar-heading">{activeNav}</h1>
          <div className="dashboard-user-badge">{displayName} Loggedin</div>
        </div>

        <div className="dashboard-content" />
      </div>
    </div>
  )
}
