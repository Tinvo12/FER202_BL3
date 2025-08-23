import React from 'react';
import { Navbar, Nav, Container, Badge, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const { getFavouritesCount } = useFavourites();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar 
      bg={isDark ? 'dark' : 'light'} 
      variant={isDark ? 'dark' : 'light'} 
      expand="lg" 
      className="mb-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          🍽️ Food Store
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
            {/* Theme Toggle */}
            <Nav.Link onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </Nav.Link>
            
            {/* Cart Icon */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              🛒
              {getTotalItems() > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>
            
            {/* Favourites Icon */}
            <Nav.Link as={Link} to="/favourites" className="position-relative">
              ❤️
              {getFavouritesCount() > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {getFavouritesCount()}
                </Badge>
              )}
            </Nav.Link>
            
            {/* User Menu */}
            <Dropdown>
              <Dropdown.Toggle variant={isDark ? 'outline-light' : 'outline-dark'} id="dropdown-basic">
                👤
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/favourites">My Favourites</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
