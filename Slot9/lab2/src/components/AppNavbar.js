import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

const AppNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar shadow-sm">
    <Container>
      <Navbar.Brand as={NavLink} to="/">Movie Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" end className={linkClass}>
            Free Movies
          </Nav.Link>
          <Nav.Link as={NavLink} to="/favorites" className={linkClass}>
            My Favourite Movies
          </Nav.Link>
          <Nav.Link as={NavLink} to="/request" className={linkClass}>
            Movie Request Form
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;