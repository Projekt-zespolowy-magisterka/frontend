// src/components/UsersTable.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('Brak tokena w localStorage!');
        setError('Brak tokena w localStorage.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/app/users/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.trim()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`http://localhost:8080/app/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error('Błąd podczas usuwania użytkownika:', response.status);
      }
    } catch (error) {
      console.error('Błąd podczas usuwania użytkownika:', error);
    }
  };

  const handleEdit = (id) => {
    // Przejście do ścieżki /profile?id=ID
    navigate(`/profile?id=${id}`);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                >
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
