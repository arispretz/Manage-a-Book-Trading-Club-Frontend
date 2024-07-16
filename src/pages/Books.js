import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link } from 'react-router-dom';

const Books = ({ isLoggedIn, userId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>
                <Link to={`/user/${book.owner._id}`}>{book.owner.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default Books;
