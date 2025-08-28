import React from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';
import { useAuth } from '../contexts/AuthContext';

const NavbarComponent = ({ onLoginClick, onCartClick, onFavouritesClick }) => {
  const { getCartCount } = useCart();
  const { getFavouritesCount } = useFavourites();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();
  const favouritesCount = getFavouritesCount();

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Mobile Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button
              variant="outline-primary"
              className="me-2 position-relative"
              onClick={onFavouritesClick}
            >
              <FaHeart className="me-1" />
              Favourites
              {favouritesCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {favouritesCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline-success"
              className="me-2 position-relative"
              onClick={onCartClick}
            >
              <FaShoppingCart className="me-1" />
              Cart
              {cartCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-success" id="dropdown-user">
                  <FaUserCircle className="me-1" />
                  {user?.name || user?.email || 'User'}
                </Dropdown.Toggle>
                                            <Dropdown.Menu>
                              <Dropdown.Header>
                                <div className="d-flex align-items-center">
                                  <FaUserCircle className="me-2" />
                                  <div>
                                    <div className="fw-bold">{user?.name || 'User'}</div>
                                    <small className="text-muted">{user?.email}</small>
                                  </div>
                                </div>
                              </Dropdown.Header>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => navigate('/profile')}>
                                <FaUser className="me-2" />
                                My Profile
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => {
                                logout();
                                navigate('/'); // Redirect to home page
                              }}>
                                <FaSignOutAlt className="me-2" />
                                Logout
                              </Dropdown.Item>
                            </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant="outline-info"
                onClick={onLoginClick}
              >
                <FaUser className="me-1" />
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
