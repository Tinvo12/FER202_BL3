import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const RequestFormModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="requestName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required isInvalid />
              <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="requestEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required isInvalid />
              <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="requestIngredient">
              <Form.Label>Desired Ingredient</Form.Label>
              <Form.Control type="text" placeholder="Ví dụ: Chicken breast, broccoli..." isInvalid />
              <Form.Control.Feedback type="invalid">Please enter your desired ingredient</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="requestMaxPrep">
              <Form.Label>Max Prep Time</Form.Label>
              <Form.Select defaultValue="" isInvalid>
                <option value="">Select...</option>
                <option value="5">5 phút</option>
                <option value="10">10 phút</option>
                <option value="15">15 phút</option>
                <option value="30">30 phút</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Please choose a max prep time</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="requestNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Additional notes (3–5 lines)" isInvalid />
              <Form.Control.Feedback type="invalid">Please add some notes</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          <FaPaperPlane className="me-2" /> Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestFormModal;


