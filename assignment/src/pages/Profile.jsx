import React, { useContext, useEffect, useState, useCallback } from 'react';
import { 
	Button, 
	Card, 
	Col, 
	Container, 
	Row, 
	Modal,
	Form,
	Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { getAccountById, updateAccount } from '../services/api.js';
import { toast } from 'react-toastify';

export default function Profile() {
	const { user, logout } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editForm, setEditForm] = useState({
		name: '',
		email: '',
		address: {
			streetName: '',
			streetNumber: '',
			city: '',
			country: 'Viet Nam'
		}
	});
	const navigate = useNavigate();

	// Countries list
	const COUNTRIES = [
		"Viet Nam",
		"Korea", 
		"Italy",
		"United States",
		"United Kingdom",
		"France",
		"Germany",
		"Japan",
		"China",
		"Australia",
		"Canada",
		"Singapore",
		"Thailand",
		"Malaysia"
	];

	// Load profile data
	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}

		console.log('Current user context:', user);

		// Nếu user context đã có đầy đủ thông tin, sử dụng luôn
		if (user.username && user.address) {
			console.log('Using user context data');
			setProfile(user);
			setEditForm({
				name: user.name || '',
				email: user.email || '',
				address: user.address || {
					streetName: '',
					streetNumber: '',
					city: '',
					country: 'Viet Nam'
				}
			});
			setLoading(false);
			return;
		}

		// Nếu không có đầy đủ thông tin, gọi API để lấy
		console.log('Fetching profile data from API');
		const loadProfile = async () => {
			try {
				setLoading(true);
				setError(null);
				const accountData = await getAccountById(user.id);
				
				console.log('API response:', accountData);
				
				if (!accountData) {
					setError('Profile not found');
					return;
				}

				setProfile(accountData);
				setEditForm({
					name: accountData.name || '',
					email: accountData.email || '',
					address: accountData.address || {
						streetName: '',
						streetNumber: '',
						city: '',
						country: 'Viet Nam'
					}
				});
			} catch (error) {
				console.error('Error loading profile:', error);
				setError('Failed to load profile');
				toast.error('Failed to load profile');
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, [user, navigate]);

	const handleLogout = useCallback(() => {
		logout();
		navigate('/');
	}, [logout, navigate]);

	const handleEdit = useCallback(() => {
		setShowEditModal(true);
	}, []);

	const handleSave = useCallback(async () => {
		try {
			const updatedProfile = await updateAccount(user.id, editForm);
			setProfile(updatedProfile);
			setShowEditModal(false);
			toast.success('Profile updated successfully!');
		} catch (error) {
			console.error('Error updating profile:', error);
			toast.error('Failed to update profile');
		}
	}, [user.id, editForm]);

	const handleCancel = useCallback(() => {
		setShowEditModal(false);
		// Reset form to original values
		if (profile) {
			setEditForm({
				name: profile.name || '',
				email: profile.email || '',
				address: profile.address || {
					streetName: '',
					streetNumber: '',
					city: '',
					country: 'Viet Nam'
				}
			});
		}
	}, [profile]);

	const handleFieldChange = useCallback((field, value) => {
		if (field.includes('.')) {
			const [parent, child] = field.split('.');
			setEditForm(prev => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value
				}
			}));
		} else {
			setEditForm(prev => ({
				...prev,
				[field]: value
			}));
		}
	}, []);

	if (!user) {
		return null;
	}

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col md={8}>
					<Card>
						<Card.Header className="d-flex justify-content-between align-items-center">
							<h3 className="mb-0">Your Profile</h3>
							<div>
								<Button variant="outline-primary" onClick={handleEdit} className="me-2">
									Edit Profile
								</Button>
								<Button variant="outline-danger" onClick={handleLogout}>
									Logout
								</Button>
							</div>
						</Card.Header>
						<Card.Body>
							{loading ? (
								<div className="text-center py-4">
									<div className="spinner-border" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<p className="mt-2">Loading profile...</p>
								</div>
							) : error ? (
								<Alert variant="danger">
									<Alert.Heading>Error</Alert.Heading>
									<p>{error}</p>
									<Button variant="outline-danger" onClick={() => window.location.reload()}>
										Retry
									</Button>
								</Alert>
							) : profile ? (
								<Row>
									<Col md={4} className="text-center">
										{profile.avatar ? (
											<img 
												src={profile.avatar} 
												alt="avatar" 
												className="rounded-circle"
												style={{ width: 150, height: 150, objectFit: 'cover' }}
											/>
										) : (
											<div 
												className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
												style={{ width: 150, height: 150 }}
											>
												<i className="fas fa-user fa-3x text-muted"></i>
											</div>
										)}
										<h5 className="mt-3">{profile.name || profile.username}</h5>
										<p className="text-muted">{profile.email}</p>
									</Col>
									<Col md={8}>
										{/* About Section */}
										<Card className="mb-3">
											<Card.Header>About</Card.Header>
											<Card.Body>
												<p><strong>Name:</strong> {profile.name || 'Not set'}</p>
												<p><strong>Email:</strong> {profile.email || 'Not set'}</p>
												<p><strong>Username:</strong> {profile.username || 'Not set'}</p>
												{profile.secretQuestion && (
													<p><strong>Secret Question:</strong> {profile.secretQuestion}</p>
												)}
											</Card.Body>
										</Card>
										
										{/* Address Section */}
										{profile.address && (
											<Card className="mb-3">
												<Card.Header>Address</Card.Header>
												<Card.Body>
													<p><strong>Street:</strong> {profile.address.streetName} {profile.address.streetNumber}</p>
													<p><strong>City:</strong> {profile.address.city}</p>
													<p><strong>Country:</strong> {profile.address.country}</p>
												</Card.Body>
											</Card>
										)}
									</Col>
								</Row>
							) : (
								<Alert variant="warning">
									<Alert.Heading>No Profile Data</Alert.Heading>
									<p>Profile data could not be loaded. Please try again.</p>
								</Alert>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Edit Profile Modal */}
			<Modal show={showEditModal} onHide={handleCancel} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={editForm.name}
								onChange={(e) => handleFieldChange('name', e.target.value)}
								placeholder="Enter your full name"
							/>
						</Form.Group>
						
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={editForm.email}
								onChange={(e) => handleFieldChange('email', e.target.value)}
								placeholder="Enter your email"
							/>
						</Form.Group>
						
						<h5>Address</h5>
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Street Name</Form.Label>
									<Form.Control
										type="text"
										value={editForm.address.streetName}
										onChange={(e) => handleFieldChange('address.streetName', e.target.value)}
										placeholder="Enter street name"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Street Number</Form.Label>
									<Form.Control
										type="text"
										value={editForm.address.streetNumber}
										onChange={(e) => handleFieldChange('address.streetNumber', e.target.value)}
										placeholder="Enter street number"
									/>
								</Form.Group>
							</Col>
						</Row>
						
						<Row>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>City</Form.Label>
									<Form.Control
										type="text"
										value={editForm.address.city}
										onChange={(e) => handleFieldChange('address.city', e.target.value)}
										placeholder="Enter city"
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group className="mb-3">
									<Form.Label>Country</Form.Label>
									<Form.Select
										value={editForm.address.country}
										onChange={(e) => handleFieldChange('address.country', e.target.value)}
									>
										{COUNTRIES.map((country, index) => (
											<option key={index} value={country}>
												{country}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCancel}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}
