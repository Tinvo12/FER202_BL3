import React, { useState } from 'react';
import { 
  Form, 
  Button, 
  Toast, 
  ToastContainer, 
  Modal, 
  Card 
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaUser, FaEnvelope, FaBirthdayCake } from 'react-icons/fa';

const ProfileForm = ({ onSubmit }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

 
  const [errors, setErrors] = useState({});

  
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

 
  const validateForm = () => {
    const newErrors = {};

    
    if (!name.trim()) {
      newErrors.name = 'Name cannot be empty';
    }

    
    if (!email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }

    
    if (!age || parseInt(age) < 1) {
      newErrors.age = 'Age must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (validateForm()) {
      const formData = { name, email, age: parseInt(age) };
      
     
      onSubmit(formData);
      
     
      setSubmittedData(formData);
      
     
      setShowToast(true);
      
      
      setShowModal(true);
      
      
      setName('');
      setEmail('');
      setAge('');
      setErrors({});
    }
  };

  
  const isFormValid = name.trim() && email.includes('@') && age && parseInt(age) >= 1;

  return (
    <>
      
      <div className="form-container">
        <h2 className="form-title text-center">
          <FaUser className="me-2" />
          Profile Form
        </h2>
        
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <FaUser className="me-2" />
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <FaEnvelope className="me-2" />
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <FaBirthdayCake className="me-2" />
              Age
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          
          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!isFormValid}
              className="w-100"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>

     
      <ToastContainer className="toast-container">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Profile Form</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submittedData && (
            <Card className="success-card text-center">
              <Card.Body>
                <FaCheckCircle className="success-icon" />
                <h4 className="mb-3">Profile Submitted Successfully!</h4>
                <div className="text-start">
                  <p><strong>Name:</strong> {submittedData.name}</p>
                  <p><strong>Email:</strong> {submittedData.email}</p>
                  <p><strong>Age:</strong> {submittedData.age}</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};


ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;