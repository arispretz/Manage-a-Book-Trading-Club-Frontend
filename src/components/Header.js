import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../App.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={Link} to="/">Book Trading Club</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto navbar-nav">
          <Nav.Link as={Link} to="/">Books</Nav.Link>
          <Nav.Link as={Link} to="/requests">Requests</Nav.Link>
          <Nav.Link as={Link} to="/trades">Trades</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <Link to="/user/profile" className="mr-3">Profile</Link>
            <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button variant="outline-info" onClick={handleLogin}>Login with GitHub</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
