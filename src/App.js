import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Login from './pages/LoginPage';
import RegistrationPage from "./pages/RegistrationPage";

import TopMenu from './components/TopMenu';
import StockOverview from './pages/StockOverview';
import Watchlist from './pages/Watchlist';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
    const storedUsername = sessionStorage.getItem('username');
    if (storedLoginStatus && storedUsername) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (userEmail) => {
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('username', userEmail);
    setIsLoggedIn(true);
    setUsername(userEmail);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
  };

  const location = useLocation();
  const isDashboardPage = location.pathname === '/stock-overview' || location.pathname === '/watchlist';

  return (
      <>
        {isLoggedIn && isDashboardPage && (
            <TopMenu username={username} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<RegistrationPage onLogin={handleLogin} />} />
          <Route path="/stock-overview" element={isLoggedIn ? <StockOverview /> : <Navigate to="/login" />} />
          <Route path="/watchlist" element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />} />
        </Routes>
      </>
  );
}

export default App;
