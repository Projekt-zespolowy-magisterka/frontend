import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import TopMenu from './components/TopMenu';
import StockOverview from './pages/StockOverview';
import Watchlist from './pages/Watchlist';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('User123'); // Replace with actual user data

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      {/* TopMenu is now always visible */}
      <TopMenu username={username} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/stock-overview" element={isLoggedIn ? <StockOverview /> : <Navigate to="/login" />} />
        <Route path="/watchlist" element={isLoggedIn ? <Watchlist /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
