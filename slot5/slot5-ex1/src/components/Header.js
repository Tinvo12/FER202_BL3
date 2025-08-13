import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaLeaf } from 'react-icons/fa';
import './Header.css';

const Header = () => {
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
          </Nav>
          <Button variant="success" className="browse-btn">
            Browse recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
