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
  const [serverStatus, setServerStatus] = useState('checking');

  const { login } = useAuth();
  const { showToast } = useToast();

  // Check server status on component mount
  React.useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await api.get('/accounts');
        setServerStatus('connected');
      } catch (error) {
        setServerStatus('disconnected');
      }
    };
    
    checkServerStatus();
  }, []);

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
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
      } else if (value.length < 8) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
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
      // Get accounts from db.json
      const { data: accounts } = await api.get('/accounts');
      
      // Find account with matching credentials
      const account = accounts.find(acc => 
        acc.email.toLowerCase() === formData.email.toLowerCase() && 
        acc.password === formData.password
      );

      if (account) {
        // Check if account is active
        if (!account.isActive) {
          showAlert('Your account is deactivated. Please contact support.', 'warning');
          setErrors({
            email: 'Account is deactivated',
            password: 'Account is deactivated'
          });
          return;
        }

        // Create user object from account data
        const userData = {
          id: account.email, // Use email as ID since no ID field
          email: account.email,
          name: account.email.split('@')[0] // Use email prefix as name
        };

        login(userData);
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
      
      // Check if it's a network/server connection error
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('fetch')) {
        showAlert('Gặp lỗi với dữ liệu nếu chưa chạy server. Vui lòng khởi động server và thử lại.', 'danger');
      } else if (error.response?.status === 404) {
        showAlert('Không tìm thấy dữ liệu tài khoản. Vui lòng kiểm tra server.', 'danger');
      } else {
        showAlert('Đăng nhập thất bại. Vui lòng kiểm tra kết nối và thử lại.', 'danger');
      }
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
              
              {/* Server Status Indicator */}
              <div className="mt-3">
                {serverStatus === 'checking' && (
                  <small className="text-muted">
                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                    Đang kiểm tra kết nối server...
                  </small>
                )}
                {serverStatus === 'connected' && (
                  <small className="text-success">
                    ✅ Server đã kết nối
                  </small>
                )}
                {serverStatus === 'disconnected' && (
                  <small className="text-danger">
                    ❌ Server chưa kết nối - Vui lòng khởi động server
                  </small>
                )}
              </div>
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
                Demo credentials: admin@example.com / Admin123@
                <br />
                <small>Active accounts: admin@example.com, traltb@fe.edu.vn</small>
                <br />
                <small className="text-warning">
                  💡 Lưu ý: Đảm bảo server JSON đang chạy (npx json-server --watch db.json --port 3001)
                </small>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
