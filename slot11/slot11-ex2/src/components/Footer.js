import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="mb-3">
              <FaGraduationCap className="me-2" />
              Student Management System
            </h5>
            <p className="text-muted">
              A comprehensive platform for managing student information, 
              providing advanced filtering and sorting capabilities.
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-muted text-decoration-none">Home</a></li>
              <li><a href="#students" className="text-muted text-decoration-none">Students</a></li>
              <li><a href="#about" className="text-muted text-decoration-none">About</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h6 className="mb-3">Contact Info</h6>
            <div className="text-muted">
              <p className="mb-2">
                <FaMapMarkerAlt className="me-2" />
                FPT University, Hoa Lac, Hanoi
              </p>
              <p className="mb-2">
                <FaPhone className="me-2" />
                +84 24 7300 1866
              </p>
              <p className="mb-2">
                <FaEnvelope className="me-2" />
                info@fpt.edu.vn
              </p>
            </div>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2024 Student Management System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
