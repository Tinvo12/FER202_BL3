import React, { useContext, useMemo, useState, useCallback, useReducer } from 'react';
import { 
	Button, 
	Card, 
	Col, 
	Container, 
	Form, 
	ProgressBar, 
	Row, 
	Nav, 
	Modal
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';

// Secret questions options
const SECRET_QUESTIONS = [
	"What is your first pet's name?",
	"What is your mother's maiden name?",
	"In which city were you born?",
	"Who was your favorite teacher?"
];

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

// Form reducer
const formReducer = (state, action) => {
	switch (action.type) {
		case 'SET_FIELD':
			return {
				...state,
				[action.field]: action.value
			};
		case 'SET_ERRORS':
			return {
				...state,
				errors: action.errors
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				errors: {}
			};
		case 'RESET':
			return {
				firstName: '',
				lastName: '',
				email: '',
				avatar: null,
				avatarPreview: '',
				username: '',
				password: '',
				confirmPassword: '',
				secretQuestion: SECRET_QUESTIONS[0],
				answer: '',
				streetName: '',
				streetNumber: '',
				city: '',
				country: 'Viet Nam',
				errors: {}
			};
		default:
			return state;
	}
};

// Initial state
const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	avatar: null,
	avatarPreview: '',
	username: '',
	password: '',
	confirmPassword: '',
	secretQuestion: SECRET_QUESTIONS[0],
	answer: '',
	streetName: '',
	streetNumber: '',
	city: '',
	country: 'Viet Nam',
	errors: {}
};

export default function Register() {
	const { register } = useContext(AuthContext);
	const [activeTab, setActiveTab] = useState('about');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [formData, dispatch] = useReducer(formReducer, initialState);

	const location = useLocation();
	const navigate = useNavigate();

	// Validation functions
	const validateAbout = useCallback(() => {
		const errors = {};
		if (!formData.firstName.trim()) errors.firstName = 'Please enter your first name';
		if (!formData.lastName.trim()) errors.lastName = 'Please enter your last name';
		if (!formData.email.trim()) {
			errors.email = 'Please enter your email';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}
		return errors;
	}, [formData.firstName, formData.lastName, formData.email]);

	const validateAccount = useCallback(() => {
		const errors = {};
		if (!formData.username.trim()) {
			errors.username = 'Please enter your username';
		} else if (formData.username.length < 6) {
			errors.username = 'Username must be at least 6 characters';
		}
		
		if (!formData.password) {
			errors.password = 'Please enter your password';
		} else if (formData.password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(formData.password)) {
			errors.password = 'Password must contain uppercase, lowercase, number and special character';
		}
		
		if (!formData.confirmPassword) {
			errors.confirmPassword = 'Please confirm your password';
		} else if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}
		
		if (!formData.answer.trim()) {
			errors.answer = 'Please enter your answer';
		}
		
		return errors;
	}, [formData.username, formData.password, formData.confirmPassword, formData.answer]);

	const validateAddress = useCallback(() => {
		const errors = {};
		if (!formData.streetName.trim()) errors.streetName = 'Please enter street name';
		if (!formData.streetNumber.trim()) errors.streetNumber = 'Please enter street number';
		if (!formData.city.trim()) errors.city = 'Please enter city';
		return errors;
	}, [formData.streetName, formData.streetNumber, formData.city]);

	// Step validation
	const isStepValid = useMemo(() => {
		switch (activeTab) {
			case 'about':
				return Object.keys(validateAbout()).length === 0;
			case 'account':
				return Object.keys(validateAccount()).length === 0;
			case 'address':
				return Object.keys(validateAddress()).length === 0;
			default:
				return false;
		}
	}, [activeTab, validateAbout, validateAccount, validateAddress]);

	// Progress calculation
	const progress = useMemo(() => {
		const steps = ['about', 'account', 'address'];
		const currentIndex = steps.indexOf(activeTab);
		return ((currentIndex + 1) / steps.length) * 100;
	}, [activeTab]);

	// Handlers
	const onFieldChange = useCallback((field, value) => {
		dispatch({ type: 'SET_FIELD', field, value });
		// Clear error when user starts typing
		if (formData.errors[field]) {
			dispatch({ 
				type: 'SET_ERRORS', 
				errors: { ...formData.errors, [field]: '' } 
			});
		}
	}, [formData.errors]);

	const onFileChange = useCallback((e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			toast.error('Avatar must be JPG/PNG');
			return;
		}
		if (file.size > 2 * 1024 * 1024) {
			toast.error('Avatar must be ≤ 2MB');
			return;
		}
		
		onFieldChange('avatar', file);
		const reader = new FileReader();
		reader.onload = () => onFieldChange('avatarPreview', reader.result);
		reader.readAsDataURL(file);
	}, [onFieldChange]);

	const nextStep = useCallback(() => {
		let errors = {};
		switch (activeTab) {
			case 'about':
				errors = validateAbout();
				break;
			case 'account':
				errors = validateAccount();
				break;
			case 'address':
				errors = validateAddress();
				break;
			default:
				errors = {};
				break;
		}
		
		if (Object.keys(errors).length > 0) {
			dispatch({ type: 'SET_ERRORS', errors });
			return;
		}
		
		const steps = ['about', 'account', 'address'];
		const currentIndex = steps.indexOf(activeTab);
		if (currentIndex < steps.length - 1) {
			setActiveTab(steps[currentIndex + 1]);
		}
	}, [activeTab, validateAbout, validateAccount, validateAddress]);

	const prevStep = useCallback(() => {
		const steps = ['about', 'account', 'address'];
		const currentIndex = steps.indexOf(activeTab);
		if (currentIndex > 0) {
			setActiveTab(steps[currentIndex - 1]);
		}
	}, [activeTab]);

	const handleSubmit = useCallback(async () => {
		const allErrors = {
			...validateAbout(),
			...validateAccount(),
			...validateAddress()
		};
		
		if (Object.keys(allErrors).length > 0) {
			dispatch({ type: 'SET_ERRORS', errors: allErrors });
			return;
		}
		
		try {
			const payload = {
				name: `${formData.firstName} ${formData.lastName}`,
				email: formData.email,
				avatar: formData.avatarPreview,
				username: formData.username,
				password: formData.password,
				secretQuestion: formData.secretQuestion,
				answer: formData.answer,
				address: {
					streetName: formData.streetName,
					streetNumber: formData.streetNumber,
					city: formData.city,
					country: formData.country
				},
				wishlist: []
			};
			
			await register(payload);
			setShowModal(true);
			toast.success('Submitted successfully!');
		} catch (err) {
			toast.error('Registration failed');
		}
	}, [formData, validateAbout, validateAccount, validateAddress, register]);

	const handleModalClose = useCallback(() => {
		setShowModal(false);
			const params = new URLSearchParams(location.search);
			const redirect = params.get('redirect_uri') || '/';
			setTimeout(() => navigate(redirect), 600);
	}, [location.search, navigate]);

	return (
		<Container className="py-4">
			<Row className="justify-content-center">
				<Col md={8} lg={7}>
					<Card>
						<Card.Body>
							<h3 className="mb-3 text-center">BUILD YOUR PROFILE</h3>
							
							{/* Navigation Tabs */}
							<Nav variant="tabs" className="mb-3">
								<Nav.Item>
									<Nav.Link 
										active={activeTab === 'about'}
										onClick={() => setActiveTab('about')}
										className={activeTab === 'about' ? 'bg-success text-white' : ''}
									>
										About
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link 
										active={activeTab === 'account'}
										onClick={() => setActiveTab('account')}
										className={activeTab === 'account' ? 'bg-success text-white' : ''}
									>
										Account
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link 
										active={activeTab === 'address'}
										onClick={() => setActiveTab('address')}
										className={activeTab === 'address' ? 'bg-success text-white' : ''}
									>
										Address
									</Nav.Link>
								</Nav.Item>
							</Nav>
							
							<ProgressBar now={progress} className="mb-3" />
							
							{/* About Tab */}
							{activeTab === 'about' && (
								<Row>
									<Col md={4} className="text-center">
										<div className="mb-3">
											{formData.avatarPreview ? (
												<img 
													src={formData.avatarPreview} 
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
										</div>
										<Form.Control
											type="file"
											accept="image/*"
											onChange={onFileChange}
											className="d-none"
											id="avatar-upload"
										/>
										<Form.Label htmlFor="avatar-upload" className="btn btn-outline-primary">
											CHOOSE PICTURE
										</Form.Label>
									</Col>
									<Col md={8}>
										<Form.Group className="mb-3">
											<Form.Label>First Name</Form.Label>
											<Form.Control
												type="text"
												value={formData.firstName}
												onChange={(e) => onFieldChange('firstName', e.target.value)}
												isInvalid={!!formData.errors.firstName}
											/>
											<Form.Control.Feedback type="invalid">
												{formData.errors.firstName}
											</Form.Control.Feedback>
										</Form.Group>
										
									<Form.Group className="mb-3">
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												type="text"
												value={formData.lastName}
												onChange={(e) => onFieldChange('lastName', e.target.value)}
												isInvalid={!!formData.errors.lastName}
											/>
											<Form.Control.Feedback type="invalid">
												{formData.errors.lastName}
											</Form.Control.Feedback>
									</Form.Group>
										
									<Form.Group className="mb-3">
										<Form.Label>Email</Form.Label>
											<Form.Control
												type="email"
												value={formData.email}
												onChange={(e) => onFieldChange('email', e.target.value)}
												isInvalid={!!formData.errors.email}
											/>
											<Form.Control.Feedback type="invalid">
												{formData.errors.email}
											</Form.Control.Feedback>
									</Form.Group>
									</Col>
								</Row>
							)}
							
							{/* Account Tab */}
							{activeTab === 'account' && (
								<>
									<Form.Group className="mb-3">
										<Form.Label>Username</Form.Label>
										<Form.Control
											type="text"
											value={formData.username}
											onChange={(e) => onFieldChange('username', e.target.value)}
											isInvalid={!!formData.errors.username}
										/>
										<Form.Control.Feedback type="invalid">
											{formData.errors.username}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<div className="position-relative">
											<Form.Control
												type={showPassword ? 'text' : 'password'}
												value={formData.password}
												onChange={(e) => onFieldChange('password', e.target.value)}
												isInvalid={!!formData.errors.password}
											/>
											<Button
												variant="link"
												className="position-absolute end-0 top-0"
												onClick={() => setShowPassword(!showPassword)}
												style={{ zIndex: 10 }}
											>
												{showPassword ? <FaEyeSlash /> : <FaEye />}
											</Button>
										</div>
										<Form.Control.Feedback type="invalid">
											{formData.errors.password}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Confirm Password</Form.Label>
										<div className="position-relative">
											<Form.Control
												type={showConfirmPassword ? 'text' : 'password'}
												value={formData.confirmPassword}
												onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
												isInvalid={!!formData.errors.confirmPassword}
											/>
											<Button
												variant="link"
												className="position-absolute end-0 top-0"
												onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												style={{ zIndex: 10 }}
											>
												{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
											</Button>
										</div>
										<Form.Control.Feedback type="invalid">
											{formData.errors.confirmPassword}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Secret Question</Form.Label>
										<Form.Select
											value={formData.secretQuestion}
											onChange={(e) => onFieldChange('secretQuestion', e.target.value)}
										>
											{SECRET_QUESTIONS.map((question, index) => (
												<option key={index} value={question}>
													{question}
												</option>
											))}
										</Form.Select>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Answer</Form.Label>
										<Form.Control
											type="text"
											value={formData.answer}
											onChange={(e) => onFieldChange('answer', e.target.value)}
											isInvalid={!!formData.errors.answer}
										/>
										<Form.Control.Feedback type="invalid">
											{formData.errors.answer}
										</Form.Control.Feedback>
									</Form.Group>
								</>
							)}
							
							{/* Address Tab */}
							{activeTab === 'address' && (
								<>
									<Form.Group className="mb-3">
										<Form.Label>Street Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Street Name"
											value={formData.streetName}
											onChange={(e) => onFieldChange('streetName', e.target.value)}
											isInvalid={!!formData.errors.streetName}
										/>
										<Form.Control.Feedback type="invalid">
											{formData.errors.streetName}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Street Number</Form.Label>
										<Form.Control
											type="text"
											placeholder="Street Number"
											value={formData.streetNumber}
											onChange={(e) => onFieldChange('streetNumber', e.target.value)}
											isInvalid={!!formData.errors.streetNumber}
										/>
										<Form.Control.Feedback type="invalid">
											{formData.errors.streetNumber}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>City</Form.Label>
										<Form.Control
											type="text"
											placeholder="City"
											value={formData.city}
											onChange={(e) => onFieldChange('city', e.target.value)}
											isInvalid={!!formData.errors.city}
										/>
										<Form.Control.Feedback type="invalid">
											{formData.errors.city}
										</Form.Control.Feedback>
									</Form.Group>
									
									<Form.Group className="mb-3">
										<Form.Label>Country</Form.Label>
										<Form.Select
											value={formData.country}
											onChange={(e) => onFieldChange('country', e.target.value)}
										>
											{COUNTRIES.map((country, index) => (
												<option key={index} value={country}>
													{country}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</>
							)}
							
							{/* Action Buttons */}
							<div className="d-flex justify-content-between mt-4">
								<Button 
									variant="secondary" 
									onClick={prevStep}
									disabled={activeTab === 'about'}
								>
									Previous
								</Button>
								
								{activeTab === 'address' ? (
									<Button 
										variant="success" 
										onClick={handleSubmit}
										disabled={!isStepValid}
									>
										Finish
									</Button>
								) : (
									<Button 
										variant="success" 
										onClick={nextStep}
										disabled={!isStepValid}
									>
										Next
									</Button>
								)}
									</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			
			{/* Profile Summary Modal */}
			<Modal show={showModal} onHide={handleModalClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Your Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Card>
						<Card.Body>
							{/* Avatar */}
							<div className="text-center mb-4">
								{formData.avatarPreview ? (
									<img 
										src={formData.avatarPreview} 
										alt="avatar" 
										className="rounded-circle"
										style={{ width: 100, height: 100, objectFit: 'cover' }}
									/>
								) : (
									<div 
										className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
										style={{ width: 100, height: 100 }}
									>
										<i className="fas fa-user fa-2x text-muted"></i>
									</div>
								)}
							</div>
							
							{/* About Section */}
							<Card className="mb-3">
								<Card.Header>About</Card.Header>
								<Card.Body>
									<p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
									<p><strong>Email:</strong> {formData.email}</p>
								</Card.Body>
							</Card>
							
							{/* Account Section */}
							<Card className="mb-3">
								<Card.Header>Account</Card.Header>
								<Card.Body>
									<p><strong>Username:</strong> {formData.username}</p>
									<p><strong>Secret Question:</strong> {formData.secretQuestion}</p>
									<p><strong>Answer:</strong> {formData.answer}</p>
								</Card.Body>
							</Card>
							
							{/* Address Section */}
							<Card>
								<Card.Header>Address</Card.Header>
								<Card.Body>
									<p><strong>Street:</strong> {formData.streetName} {formData.streetNumber}</p>
									<p><strong>City:</strong> {formData.city}</p>
									<p><strong>Country:</strong> {formData.country}</p>
								</Card.Body>
							</Card>
						</Card.Body>
					</Card>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}


