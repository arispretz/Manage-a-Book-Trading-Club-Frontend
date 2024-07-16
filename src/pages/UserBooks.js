import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link, useParams } from 'react-router-dom';

const UserBooks = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}/books`);
        setUser(response.data.user);
        setBooks(response.data.books);
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
      <h2>{user.name}'s Books</h2>
      {books.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Owner</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>
                  <Link to={`/user/${book.owner._id}`}>{book.owner.name}</Link>
                </td>
                <td>{book.owner.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default UserBooks;
