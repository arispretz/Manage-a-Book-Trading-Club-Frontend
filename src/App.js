// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { api, setupAxiosInterceptors } from './api/axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Books from './pages/Books';
import UserProfile from './pages/UserProfile';
import UserBooks from './pages/UserBooks';
import LoginPage from './pages/LoginPage';
import Requests from './pages/Requests';
import SendRequest from './pages/SendRequest';
import EditRequestedBooks from './pages/EditRequestedBooks';
import Trades from './pages/Trades';
import Users from './pages/Users';
import AddBook from './pages/AddBook';
import PrivateRoute from './components/PrivateRoute';

setupAxiosInterceptors();

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setIsLoggedIn(true);
        setUserId(response.data.userId);
      } catch (error) {
        setIsLoggedIn(false);
        setUserId(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setIsLoggedIn(false);
      setUserId(null);
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Books />} />
          <Route path="/user/:id/books" element={<UserBooks />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/trades" element={<Trades userId={userId} />} />
          <Route path="/users" element={<Users />} />

          <Route element={<PrivateRoute />}>
            <Route path="/user/:userId/requests" element={<SendRequest userId={userId} />} />
            <Route path="/user/:userId/requests/edit" element={<EditRequestedBooks userId={userId} />} />
            <Route path="/user/:userId/books/add" element={<AddBook userId={userId} />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppWrapper;
