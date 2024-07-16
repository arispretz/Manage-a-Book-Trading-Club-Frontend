import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>City: {user.city}</p>
      <p>State: {user.state}</p>
      <p>Country: {user.country}</p>
      <Link to={`/user/${user._id}/books`}>
        <button>View User's Books</button>
      </Link>
    </div>
  );
};

export default UserProfile;
