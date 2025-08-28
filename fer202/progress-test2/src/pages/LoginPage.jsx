import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import api from '../services/api';

export default function LoginPage({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const { login } = useAuth();
  const { showToast } = useToast();

  const showAlert = (message, variant = 'danger') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    // Auto hide alert after 5 seconds
    setTimeout(() => {
      setAlertMessage('');
      setAlertVariant('');
    }, 5000);
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear alert when user starts typing
    if (alertMessage) {
      setAlertMessage('');
      setAlertVariant('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Validate individual field on blur
    if (name === 'email') {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
    
    if (name === 'password') {
      if (!value) {
        setErrors(prev => ({ ...prev, password: 'Password is required' }));
      } else if (value.length < 6) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters long' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show alert for validation errors
      showAlert('Please fix the errors in the form before submitting.', 'warning');
      return;
    }

    setLoading(true);
    try {
      // Get users from db.json
      const { data: users } = await api.get('/users');
      
      // Find user with matching credentials
      const user = users.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );

      if (user) {
        login({
          id: user.id,
          email: user.email,
          name: user.name || user.email
        });
        showAlert('Login successful! Welcome back!', 'success');
        // Close modal after successful login
        setTimeout(() => {
          if (onClose) onClose();
        }, 1500);
      } else {
        showAlert('Invalid email or password. Please try again.', 'danger');
        // Add visual feedback by setting errors on both fields
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Login failed. Please check your connection and try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={12}>
        <Card className="shadow">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <FaSignInAlt size={48} className="text-primary mb-3" />
              <h2>Login</h2>
              <p className="text-muted">Enter your credentials to continue</p>
            </div>

            {/* Alert Message */}
            {alertMessage && (
              <Alert 
                variant={alertVariant} 
                dismissible 
                onClose={() => {
                  setAlertMessage('');
                  setAlertVariant('');
                }}
                className="mb-3"
              >
                {alertMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  isInvalid={!!errors.email}
                  disabled={loading}
                  className={errors.email ? 'border-danger' : ''}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.password}
                    disabled={loading}
                    className={errors.password ? 'border-danger' : ''}
                  />
                  <Button
                    type="button"
                    variant="outline-secondary"
                    size="sm"
                    className="position-absolute end-0 top-0 h-100 border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
                
                {onClose && (
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Demo credentials: admin@example.com / password123
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
