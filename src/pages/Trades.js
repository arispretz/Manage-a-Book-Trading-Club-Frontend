import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Link } from 'react-router-dom';

const Trades = ({ userId }) => {
  const [acceptedTrades, setAcceptedTrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAcceptedTrades = async () => {
      try {
        const response = await api.get(`/api/trades?userId=${userId}&status=accepted`);
        setAcceptedTrades(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAcceptedTrades();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Trades</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Offered Book</th>
            <th>Requested Book</th>
            <th>Trading Partner</th>
          </tr>
        </thead>
        <tbody>
          {acceptedTrades.map((trade) => (
            <tr key={trade._id}>
              <td>{trade.offeredBook.title}</td>
              <td>{trade.requestedBook.title}</td>
              <td>
                <Link to={`/users/${trade.user._id}`}>{trade.user.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
