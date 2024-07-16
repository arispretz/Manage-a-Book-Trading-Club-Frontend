import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link } from 'react-router-dom';

const Requests = ({ isLoggedIn, userId }) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await api.get('/api/trades');
        setTrades(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching trades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Requests</h2>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Offered Book</th>
            <th>Requested Book</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade._id}>
              <td>
                <Link to={`/user/${trade.user._id}`}>{trade.user.name}</Link>
              </td>
              <td>
                <div>{trade.offeredBook.title}</div>
              </td>
              <td>
                <div>{trade.requestedBook.title}</div>
              </td>
              <td>{trade.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
