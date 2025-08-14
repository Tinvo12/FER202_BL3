import React, { useMemo, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RequestFormModal = ({ show, onHide }) => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		ingredient: '',
		maxPrep: '',
		notes: ''
	});
	const [showErrors, setShowErrors] = useState(false);

	const errors = useMemo(() => {
		return {
			name: form.name.trim() === '' ? 'Please enter your name' : '',
			email:
				form.email.trim() === ''
					? 'Please provide a valid email'
					: emailRegex.test(form.email) ? '' : 'Please provide a valid email',
			ingredient: form.ingredient.trim() === '' ? 'Please enter your desired ingredient' : '',
			maxPrep: form.maxPrep === '' ? 'Please choose a max prep time' : '',
			notes: form.notes.trim() === '' ? 'Please add some notes' : ''
		};
	}, [form]);

	const isFormValid = useMemo(() => Object.values(errors).every((e) => e === ''), [errors]);

	const updateField = (field) => (e) => {
		const value = e.target.value;
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		setShowErrors(true);
		if (isFormValid) {
			onHide();
		}
	};

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Recipe Request Form</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form noValidate onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
					<Row className="mb-3">
						<Form.Group as={Col} md="12" controlId="requestName">
							<Form.Label>Your Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your name"
								value={form.name}
								onChange={updateField('name')}
								isInvalid={showErrors && !!errors.name}
							/>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} md="12" controlId="requestEmail">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								value={form.email}
								onChange={updateField('email')}
								isInvalid={showErrors && !!errors.email}
							/>
							<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} md="12" controlId="requestIngredient">
							<Form.Label>Desired Ingredient</Form.Label>
							<Form.Control
								type="text"
								placeholder="Ví dụ: Chicken breast, broccoli..."
								value={form.ingredient}
								onChange={updateField('ingredient')}
								isInvalid={showErrors && !!errors.ingredient}
							/>
							<Form.Control.Feedback type="invalid">{errors.ingredient}</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} md="12" controlId="requestMaxPrep">
							<Form.Label>Max Prep Time</Form.Label>
							<Form.Select
								value={form.maxPrep}
								onChange={updateField('maxPrep')}
								isInvalid={showErrors && !!errors.maxPrep}
							>
								<option value="">Select...</option>
								<option value="5">5 phút</option>
								<option value="10">10 phút</option>
								<option value="15">15 phút</option>
								<option value="30">30 phút</option>
							</Form.Select>
							<Form.Control.Feedback type="invalid">{errors.maxPrep}</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group as={Col} md="12" controlId="requestNotes">
							<Form.Label>Notes</Form.Label>
							<Form.Control
								as="textarea"
								rows={4}
								placeholder="Additional notes (3–5 lines)"
								value={form.notes}
								onChange={updateField('notes')}
								isInvalid={showErrors && !!errors.notes}
							/>
							<Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
						</Form.Group>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleSubmit}>
					<FaPaperPlane className="me-2" /> Submit Request
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default RequestFormModal;


