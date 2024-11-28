import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopMenu.css';
import LogoSection from '../components/LogoSection';


function TopMenu({ username, onLogout }) {
  return (
      <div className="top-menu">
        <LogoSection />
        <div className="right-section">
          <div className="nav-links">
            <NavLink
                to="/stock-overview"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
                Explore
            </NavLink>
            {/*<NavLink*/}
            {/*    to="/watchlist"*/}
            {/*    className={({ isActive }) => (isActive ? 'active' : undefined)}*/}
            {/*>*/}
            {/*  Watchlist*/}
            {/*</NavLink>*/}
          </div>
          <span className="username">{username}</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </div>
  );
}

export default TopMenu;