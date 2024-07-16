import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';

const SendRequest = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [ownedBooks, setOwnedBooks] = useState([]);
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/users/${userId}`);
        setUser(response.data.user);
        setOwnedBooks(response.data.ownedBooks);
        setRequestedBooks(response.data.requestedBooks);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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

  const handleEditOwnedBooks = () => {
    console.log('Editing owned books');
  };

  const handleEditRequestedBooks = () => {
    console.log('Editing requested books');
  };

  const handleBookSelection = (bookId) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookId)
        ? prevSelectedBooks.filter((id) => id !== bookId)
        : [...prevSelectedBooks, bookId]
    );
  };

  const handleSendRequest = async () => {
    try {
      await api.post('/api/requests', { userId, bookIds: selectedBooks });
      alert('Request sent successfully!');
      setSelectedBooks([]);
    } catch (error) {
      setError(error.message);
      console.error('Error sending request:', error);
    }
  };
  return (
    <div>
      <h2>Send Request</h2>
      <h3>Owned Books</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {ownedBooks.map((book) => (
            <tr key={book._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book._id)}
                  onChange={() => handleBookSelection(book._id)}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Requested Books</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {requestedBooks.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleEditOwnedBooks}>Edit Owned Books</button>
        <button onClick={handleEditRequestedBooks}>Edit Requested Books</button>
        <button onClick={handleSendRequest}>Send Request</button>
      </div>
    </div>
  );
};

export default SendRequest;
