import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="bg-primary text-white py-5 mb-4">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <FaGraduationCap size={60} className="mb-3" />
            <h1 className="display-4 fw-bold mb-3">
              Student Management System
            </h1>
            <p className="lead mb-0">
              Efficiently manage and organize student information with advanced filtering, 
              sorting, and search capabilities. View detailed student profiles and maintain 
              comprehensive records in one centralized platform.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
