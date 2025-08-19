import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { FaUser, FaCamera } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AboutTab = ({ formData, onFieldChange, onFileChange, isValid }) => {
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      onFileChange(file); 
    }
  };

  
  const getAvatarPreview = () => {
    if (formData.avatar) {
      return URL.createObjectURL(formData.avatar);
    }
    return null;
  };

  return (
    <Row>
      <Col md={4}>
        
        <Card className="text-center p-3 border-2">
          <div className="avatar-upload-container mb-3">
           
            <div className="avatar-preview mx-auto d-flex align-items-center justify-content-center">
              {getAvatarPreview() ? (
                
                <img 
                  src={getAvatarPreview()} 
                  alt="Avatar preview" 
                  className="rounded-circle"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
               
                <FaUser size={60} className="text-muted" />
              )}
            </div>
            
            <label 
              htmlFor="avatar-upload" 
              className="camera-icon"
            >
              <FaCamera size={16} />
            </label>
          </div>
          
          <input
            type="file"
            id="avatar-upload"
            accept="image/*" 
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <p className="text-muted mb-0 fw-semibold">CHOOSE PICTURE</p>
        </Card>
      </Col>
      
      <Col md={8}>
      
        <Form>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">First Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstName}
              onChange={(e) => onFieldChange('firstName', e.target.value)}
              
              isInvalid={!isValid && formData.firstName.trim() === ''}
              className="bg-light"
            />
            
            <Form.Control.Feedback type="invalid">
              Please enter your first name
            </Form.Control.Feedback>
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Last Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.lastName}
              onChange={(e) => onFieldChange('lastName', e.target.value)}
              isInvalid={!isValid && formData.lastName.trim() === ''}
              className="bg-light"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your last name
            </Form.Control.Feedback>
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => onFieldChange('email', e.target.value)}
              
              isInvalid={!isValid && (formData.email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
              className="bg-light"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};


AboutTab.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.object 
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired, 
  onFileChange: PropTypes.func.isRequired,  
  isValid: PropTypes.bool.isRequired        
};

export default AboutTab;
