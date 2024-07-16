import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link } from 'react-router-dom';

const AddBook = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is missing');
        }

        const response = await api.get(`/api/users/${userId}/books`);
        setOwnedBooks(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, [userId]);

  const handleAddBook = async () => {
    try {
      if (!title || !description) {
        alert('Title and description are required');
        return;
      }

      const newBook = {
        title,
        description,
        owner: userId
      };
      await api.post(`/api/books`, newBook);
      const response = await api.get(`/api/users/${userId}/books`);
      setOwnedBooks(response.data);
      setTitle('');
      setDescription('');
      alert('Book added successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error adding book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await api.delete(`/api/books/${bookId}`);
      const response = await api.get(`/api/users/${userId}/books`);
      setOwnedBooks(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <h3>Owned Books</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : ownedBooks.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ownedBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>
                  <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books available.</p>
      )}
      <div>
        <Link to={`/user/${userId}/books/interchange`}>
          <button>Interchange Books</button>
        </Link>
        <Link to={`/user/${userId}/requests`}>
          <button>New Request</button>
        </Link>
      </div>
    </div>
  );
};

export default AddBook;
