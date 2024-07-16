import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const EditRequestedBooks = ({ userId }) => {
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestedBooks = async () => {
      if (!userId) {
        setError('User ID is not available.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/requests/user/${userId}`);
        setRequestedBooks(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching requested books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedBooks();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleBookSelection = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleUpdateRequestedBooks = async () => {
    try {
      await api.put(`/api/requests/user/${userId}`, { userId, requestedBookIds: selectedBooks });
      navigate(`/user/${userId}/requests`);
    } catch (error) {
      setError(error.message);
      console.error('Error updating requested books:', error);
    }
  };

  return (
    <div>
      <h2>Edit Requested Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {requestedBooks.map((book) => (
            <tr key={book.book._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(book.book._id)}
                  onChange={() => handleBookSelection(book.book._id)}
                />
              </td>
              <td>{book.book.title}</td>
              <td>{book.book.description}</td>
              <td>
                <Link to={`/user/${book.book.owner._id}`}>{book.book.owner.name}</Link>
              </td>
              <td>{book.book.owner.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleUpdateRequestedBooks}>Update Requested Books</button>
        <Link to={`/user/${userId}/requests`}>
          <button>Back to Send Request</button>
        </Link>
      </div>
    </div>
  );
};

export default EditRequestedBooks;
