import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please login to view your profile', 'warning');
      navigate('/products');
    }
  }, [isAuthenticated, navigate, showToast]);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.email.split('@')[0] || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const showAlert = (message, variant = 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setTimeout(() => {
      setAlertMessage('');
      setAlertVariant('');
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert('Profile updated successfully!', 'success');
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Update error:', error);
      showAlert('Failed to update profile. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user.name || user.email.split('@')[0] || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/'); // Redirect to home page
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <FaUser className="me-2 text-primary" />
              My Profile
            </h1>
          </div>

          {alertMessage && (
            <Alert
              variant={alertVariant}
              dismissible
              onClose={() => { setAlertMessage(''); setAlertVariant(''); }}
              className="mb-4"
            >
              {alertMessage}
            </Alert>
          )}

          <Row>
            {/* Profile Information Card */}
            <Col md={8}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <FaUser className="me-2" />
                      Account Information
                    </h5>
                    {!isEditing && (
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <FaEdit className="me-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <FaUser className="me-1 text-muted" />
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <FaEnvelope className="me-1 text-muted" />
                            Email Address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled={true} // Email cannot be changed
                            className="bg-light"
                          />
                          <Form.Text className="text-muted">
                            Email address cannot be changed
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <FaCalendarAlt className="me-1 text-muted" />
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <FaShieldAlt className="me-1 text-muted" />
                            Account Status
                          </Form.Label>
                          <div>
                            <Badge bg="success" className="fs-6 px-3 py-2">
                              Active
                            </Badge>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUser className="me-1 text-muted" />
                        Address
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your address"
                      />
                    </Form.Group>

                    {isEditing && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave className="me-1" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleCancel}
                          disabled={loading}
                        >
                          <FaTimes className="me-1" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Account Summary Card */}
            <Col md={4}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-info text-white">
                  <h6 className="mb-0">
                    <FaUser className="me-2" />
                    Account Summary
                  </h6>
                </Card.Header>
                <Card.Body>
                  <div className="text-center mb-3">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '80px', height: '80px' }}>
                      <FaUser size={32} />
                    </div>
                    <h5 className="mb-1">{formData.name}</h5>
                    <p className="text-muted mb-0">{formData.email}</p>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Member Since:</span>
                    <span className="fw-bold">2024</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Account Type:</span>
                    <Badge bg="primary">Standard</Badge>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Status:</span>
                    <Badge bg="success">Active</Badge>
                  </div>
                </Card.Body>
              </Card>

              {/* Quick Actions Card */}
              <Card className="shadow-sm">
                <Card.Header className="bg-secondary text-white">
                  <h6 className="mb-0">Quick Actions</h6>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate('/cart')}
                    >
                      View Cart
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={() => navigate('/favourites')}
                    >
                      My Favourites
                    </Button>
                    <Button
                      variant="outline-info"
                      onClick={() => navigate('/products')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
