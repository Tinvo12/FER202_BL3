import React from 'react';
import { Navbar, Nav, Button, Container, Badge } from 'react-bootstrap';
import { FaLeaf, FaHeart, FaWpforms } from 'react-icons/fa';
import './Header.css';

const Header = ({ favouritesCount = 0, onOpenRequestForm }) => {
  return (
    <Navbar bg="white" expand="lg" className="header-navbar">
      <Container>
        <Navbar.Brand href="#home" className="brand">
          <FaLeaf className="leaf-icon" />
          <span className="brand-text">Healthy Recipe Finder</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home" className="nav-link">Home</Nav.Link>
            <Nav.Link href="#about" className="nav-link">About</Nav.Link>
            <Nav.Link href="#recipes" className="nav-link active">Recipes</Nav.Link>
            <Nav.Link href="#request" className="nav-link" onClick={onOpenRequestForm}>
              Recipe Request Form <FaWpforms className="ms-1" />
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button variant="light" className="position-relative">
              <FaHeart className="text-danger" />
              <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                {favouritesCount}
              </Badge>
            </Button>
            <Button variant="success" className="browse-btn">
              Browse recipes
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
