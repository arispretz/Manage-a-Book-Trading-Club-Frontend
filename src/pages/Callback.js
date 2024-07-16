import React, { useEffect } from 'react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await api.post('/api/auth/github', { code });
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetchAccessToken(code);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <p>Loading...</p>;
};

export default Callback;
