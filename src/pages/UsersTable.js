import React, { useState } from 'react';
import mockUsers from '../utils/mockUsers';

const UsersTable = () => {
    const [users, setUsers] = useState(mockUsers);

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
            )
        );
    };

    const deleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    return (
        <div className="mt-4">
            <h2>Manage Users</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>{user.registrationDate}</td>
                        <td>
                            <button onClick={() => toggleStatus(user.id)} className="btn btn-primary btn-sm">
                                {user.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                            <button onClick={() => deleteUser(user.id)} className="btn btn-danger btn-sm ms-2">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
