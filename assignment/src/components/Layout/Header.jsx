import React, { useContext, useMemo } from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';

export default function Header() {
	const { count } = useContext(CartContext);
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const handleSignOut = () => {
		logout();
		navigate('/');
	};

	const wishlistLink = useMemo(() => (
		<Link className="nav-link" to="/wishlist">Wishlist</Link>
	), []);

	return (
		<Navbar bg="light" expand="lg" className="mb-3">
			<Container>
				<Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
				<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav className="me-auto">
						<Link className="nav-link" to="/">Home</Link>
						{wishlistLink}
						<Link className="nav-link" to="/cart">Cart <Badge bg="secondary">{count}</Badge></Link>
						<Link className="nav-link" to="/checkout">Checkout</Link>
					</Nav>
					<Nav>
						{user ? (
							<NavDropdown title={user.name} id="user-dropdown" align="end">
								<NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
							</NavDropdown>
						) : (
							<Nav.Link as={Link} to={`/login?redirect_uri=${encodeURIComponent(location.pathname + location.search)}`}>Sign in</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}


