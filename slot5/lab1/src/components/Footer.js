import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <p className="footer-text">
              Made with ❤️ and 🥑
            </p>
          </Col>
          <Col md={6} className="text-end">
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="TikTok">
                <FaTiktok />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
