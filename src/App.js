import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
