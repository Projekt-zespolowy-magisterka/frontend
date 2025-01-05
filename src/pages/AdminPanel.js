// src/pages/AdminPanel.jsx
import React from 'react';
import UsersTable from '../components/UsersTable';

const AdminPanel = () => {
  return (
    <div className="container mt-4">
      <h1>Admin Panel</h1>

      {/* Sekcja z tabelą użytkowników */}
      <div className="mb-5">
        <UsersTable />
      </div>
    </div>
  );
};

export default AdminPanel;
