import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const AccountTab = ({ formData, onFieldChange, isValid }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const secretQuestions = [
    "What is your first pet's name?",
    "What is your mother's maiden name?",
    "In which city were you born?",
    "Who was your favorite teacher?"
  ];

  
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);     
    const hasLowerCase = /[a-z]/.test(password);     
    const hasNumbers = /\d/.test(password);          
    const hasSpecialChar = /[@$!%*?&]/.test(password); 
    const isLongEnough = password.length >= 8;       

    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isLongEnough
    };
  };

  
  const passwordValidation = validatePassword(formData.password);

  return (
    <Form>
    
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Username</Form.Label>
        <Form.Control
          type="text"
          value={formData.username}
          onChange={(e) => onFieldChange('username', e.target.value)}
          
          isInvalid={!isValid && formData.username.length < 6}
          className="bg-light"
        />
        <Form.Control.Feedback type="invalid">
          Username must be at least 6 characters long
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Username must be at least 6 characters long
        </Form.Text>
      </Form.Group>

     
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Password</Form.Label>
        
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"} 
            value={formData.password}
            onChange={(e) => onFieldChange('password', e.target.value)}
            isInvalid={!isValid && formData.password.length < 8}
            className="bg-light"
          />
          
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters long with uppercase, lowercase, number, and special character
          </Form.Control.Feedback>
        </InputGroup>
        
        
        <div className="mt-2 password-strength">
          <small className="d-block mb-1">Password requirements:</small>
          <div className="d-flex flex-wrap gap-2">
            
            <span className={`badge ${passwordValidation.isLongEnough ? 'bg-success' : 'bg-secondary'}`}>
              At least 8 characters
            </span>
            <span className={`badge ${passwordValidation.hasUpperCase ? 'bg-success' : 'bg-secondary'}`}>
              Uppercase letter
            </span>
            <span className={`badge ${passwordValidation.hasLowerCase ? 'bg-success' : 'bg-secondary'}`}>
              Lowercase letter
            </span>
            <span className={`badge ${passwordValidation.hasNumbers ? 'bg-success' : 'bg-secondary'}`}>
              Number
            </span>
            <span className={`badge ${passwordValidation.hasSpecialChar ? 'bg-success' : 'bg-secondary'}`}>
              Special character
            </span>
          </div>
        </div>
      </Form.Group>

      
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
           
            isInvalid={!isValid && formData.password !== formData.confirmPassword}
            className="bg-light"
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            Passwords do not match
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

     
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Secret Question</Form.Label>
       
        <Form.Select
          value={formData.secretQuestion}
          onChange={(e) => onFieldChange('secretQuestion', e.target.value)}
          isInvalid={!isValid && formData.secretQuestion === ''}
          className="bg-light"
        >
          <option value="">Select a secret question</option>
        
          {secretQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select a secret question
        </Form.Control.Feedback>
      </Form.Group>

      
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Answer</Form.Label>
        <Form.Control
          type="text"
          value={formData.answer}
          onChange={(e) => onFieldChange('answer', e.target.value)}
          isInvalid={!isValid && formData.answer.trim() === ''}
          className="bg-light"
        />
        <Form.Control.Feedback type="invalid">
          Please provide an answer to your secret question
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};


AccountTab.propTypes = {
  formData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    secretQuestion: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired       
};

export default AccountTab;
