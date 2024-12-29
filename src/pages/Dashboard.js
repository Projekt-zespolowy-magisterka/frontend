import React from 'react';
import mockDashboardData from '../utils/mockDashboardData';

const Dashboard = () => {
    return (
        <div className="mt-4">
            <h2>Dashboard</h2>
            <div className="row">
                {Object.entries(mockDashboardData).map(([key, value]) => (
                    <div className="col-md-3" key={key}>
                        <div className="card p-3">
                            <h5>{key}</h5>
                            <p>{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
