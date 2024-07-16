import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Owned Books</th>
            <th>Incoming Requests</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/users/${user._id}`}>{user.name}</Link>
              </td>
              <td>{user.city}</td>
              <td>{user.ownedBooks ? user.ownedBooks.length : 0}</td>
              <td>{user.incomingRequests ? user.incomingRequests.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
