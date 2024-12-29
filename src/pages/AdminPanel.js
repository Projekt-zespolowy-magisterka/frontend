import React from 'react';
import Dashboard from './Dashboard';
import UsersTable from './UsersTable';
import SettingsPanel from './SettingsPanel';

const AdminPanel = () => {
    return (
        <div className="container mt-4">
            <h1>Admin Panel</h1>

            {/* Dashboard Section */}
            <div className="mb-5">
                <Dashboard />
            </div>

            {/* Users Table Section */}
            <div className="mb-5">
                <UsersTable />
            </div>

            {/* Settings Panel Section */}
            <div className="mb-5">
                <SettingsPanel />
            </div>
        </div>
    );
};

export default AdminPanel;
