import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
	const { login, setRedirectAfterLogin } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(() => {
		const params = new URLSearchParams(location.search);
		const redirect = params.get('redirect_uri') || '/';
		setRedirectAfterLogin(redirect);
	}, [location.search, setRedirectAfterLogin]);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			const params = new URLSearchParams(location.search);
			const redirect = params.get('redirect_uri') || '/';
			navigate(redirect);
		} catch (err) {
			toast.error(err.message || 'Login failed');
		}
	};

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col md={6} lg={5}>
					<Card>
						<Card.Body>
							<h3 className="mb-3">Sign in</h3>
							<Form onSubmit={onSubmit}>
								<Form.Group className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
								</Form.Group>
								<Button type="submit" className="w-100">Sign in</Button>
							</Form>
							<div className="mt-3 text-center">
								New Customer? <Link to="/register">Create an account</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<ToastContainer autoClose={2500} />
		</Container>
	);
}


