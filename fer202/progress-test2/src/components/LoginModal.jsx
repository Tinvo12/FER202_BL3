import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ show, onHide }) => {
  const { isAuthenticated } = useAuth();

  const handleClose = () => {
    if (isAuthenticated) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginPage onClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
