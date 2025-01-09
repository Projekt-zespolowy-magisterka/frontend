import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import UserFilters from '../components/UsersFilters';

const AdminPanel = () => {
  const initialFilters = { searchBy: 'email', searchTerm: '' };
  const [filters, setFilters] = useState(initialFilters);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => setFilters(initialFilters);

  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <div className="container mt-4">
      <h1>Admin Panel</h1>
      <div className="row mt-4">
        {/* Sidebar */}
        <div className="col-md-3">
          <UserFilters
            onApplyFilters={handleApplyFilters}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
        {/* Main content */}
        <div className="col-md-9">
          <UsersTable filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
