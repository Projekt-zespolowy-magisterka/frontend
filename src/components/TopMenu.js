import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './TopMenu.css';

function TopMenu({ username, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Calls the logout function passed from parent
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="top-menu">
      <div className="nav-links">
        <NavLink to="/stock-overview" activeClassName="active">
          Stock Overview
        </NavLink>
        <NavLink to="/watchlist" activeClassName="active">
          Watchlist
        </NavLink>
      </div>
      <div className="user-section">
        <span className="username">{username}</span>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
}

export default TopMenu;
