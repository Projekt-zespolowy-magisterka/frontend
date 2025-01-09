import React, { useState } from 'react';

const UserFilters = ({ onApplyFilters, onResetFilters, hasActiveFilters }) => {
    const [localFilters, setLocalFilters] = useState({ searchBy: 'email', searchTerm: '' });

    const handleInputChange = (e, filterName) => {
        const value = e.target.value;
        setLocalFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleApplyFilters = () => {
        onApplyFilters(localFilters);
    };

    return (
        <div className="border rounded p-4 bg-white shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-primary m-0">User Filters</h5>
                {hasActiveFilters && (
                    <button className="btn btn-sm btn-outline-primary" onClick={onResetFilters}>
                        Reset All
                    </button>
                )}
            </div>

            {/* Select Filter Type */}
            <div className="mt-3">
                <label className="form-label">Search by</label>
                <select
                    className="form-select"
                    value={localFilters.searchBy}
                    onChange={(e) => handleInputChange(e, 'searchBy')}
                >
                    <option value="email">Email</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="id">ID</option>
                </select>
            </div>

            {/* Search Input */}
            <div className="mt-3">
                <label className="form-label">Search</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter search term..."
                    value={localFilters.searchTerm}
                    onChange={(e) => handleInputChange(e, 'searchTerm')}
                />
            </div>

            {/* Apply Filters Button */}
            <div className="mt-4">
                <button className="btn btn-primary w-100" onClick={handleApplyFilters}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default UserFilters;
