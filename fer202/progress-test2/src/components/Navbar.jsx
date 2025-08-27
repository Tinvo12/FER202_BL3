import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';

const NavbarComponent = ({ onLoginClick, onCartClick, onFavouritesClick }) => {
  const { getCartCount } = useCart();
  const { getFavouritesCount } = useFavourites();
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
            <Button
              variant="outline-info"
              onClick={onLoginClick}
            >
              <FaUser className="me-1" />
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
