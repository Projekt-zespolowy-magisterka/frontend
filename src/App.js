import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation, matchPath} from 'react-router-dom';
import Login from './pages/LoginPage';
import RegistrationPage from "./pages/RegistrationPage";

import TopMenu from './components/TopMenu';
import StockOverview from './pages/StockOverview';
import Watchlist from './pages/Watchlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockDetails from "./pages/StockDetails";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (storedLoginStatus && storedUsername) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (userEmail, userToken, userId) => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('username', userEmail);
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    setUsername(userEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUsername('');
  };

  const location = useLocation();
  const isDashboardPage =
      location.pathname === '/stock-overview' ||
      location.pathname === '/watchlist' ||
      matchPath('/stock/:symbol', location.pathname);

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
          <Route path="/stock/:symbol" element={isLoggedIn ? <StockDetails /> : <Navigate to="/login" />} />
        </Routes>
      </>
  );
}

export default App;
