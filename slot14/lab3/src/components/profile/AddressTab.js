import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddressTab = ({ formData, onFieldChange, isValid }) => {
  
  const countries = [
    "Viet Nam",
    "Korea",
    "Italy",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "Spain",
    "Netherlands",
    "Switzerland",
    "Sweden",
    "Norway",
    "Denmark"
  ];

  return (
    <Form>
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Street Address</Form.Label>
        <Form.Control
          type="text"
          value={formData.street}
          onChange={(e) => onFieldChange('street', e.target.value)}
          
          isInvalid={!isValid && formData.street.trim() === ''}
          className="bg-light"
          placeholder="Enter your street address"
        />
        <Form.Control.Feedback type="invalid">
          Please enter your street address
        </Form.Control.Feedback>
      </Form.Group>

      
      <Row>
        <Col md={6}>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">City</Form.Label>
            <Form.Control
              type="text"
              value={formData.city}
              onChange={(e) => onFieldChange('city', e.target.value)}
              isInvalid={!isValid && formData.city.trim() === ''}
              className="bg-light"
              placeholder="Enter your city"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your city
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
        
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">State/Province</Form.Label>
            <Form.Control
              type="text"
              value={formData.state}
              onChange={(e) => onFieldChange('state', e.target.value)}
              isInvalid={!isValid && formData.state.trim() === ''}
              className="bg-light"
              placeholder="Enter your state or province"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your state or province
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">ZIP/Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={formData.zipCode}
              onChange={(e) => onFieldChange('zipCode', e.target.value)}
              isInvalid={!isValid && formData.zipCode.trim() === ''}
              className="bg-light"
              placeholder="Enter your ZIP or postal code"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your ZIP or postal code
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Country</Form.Label>
            
            <Form.Select
              value={formData.country}
              onChange={(e) => onFieldChange('country', e.target.value)}
              isInvalid={!isValid && formData.country === ''}
              className="bg-light"
            >
              <option value="">Select your country</option>
              
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select your country
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};


AddressTab.propTypes = {
  formData: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired, 
  isValid: PropTypes.bool.isRequired        
};

export default AddressTab;
