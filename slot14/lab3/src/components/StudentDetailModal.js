import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Badge, Card } from 'react-bootstrap';
import { FaEnvelope, FaBirthdayCake, FaIdCard, FaTimes, FaUser, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

const StudentDetailModal = ({ student, show, onHide }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x200/667eea/ffffff?text=No+Image';
  };

  const getAvatarSrc = () => {
    if (!student.avatar || student.avatar.trim() === '') {
      return `https://via.placeholder.com/200x200/667eea/ffffff?text=${student.name.charAt(0)}`;
    }
    return student.avatar;
  };

  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center">
            <img
              src={getAvatarSrc()}
              alt={`${student.name}'s avatar`}
              className="rounded-circle mb-3 shadow"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              onError={handleImageError}
            />
          </Col>
          <Col md={8}>
            <h3 className="mb-3">{student.name}</h3>
            <Badge bg="primary" className="mb-3 fs-6">Student ID: {student.id}</Badge>
            
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <FaEnvelope className="me-2" />
                Email Address
              </h6>
              <p className="fs-5">{student.email}</p>
            </div>
            
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <FaBirthdayCake className="me-2" />
                Age
              </h6>
              <p className="fs-5">{student.age} years old</p>
            </div>
            
            {/* Profile Information Section - Phần thông tin profile */}
            {student.profile && (
              <div className="mt-4">
                <h5 className="mb-3 text-primary">
                  <FaUser className="me-2" />
                  Profile Information
                </h5>
                
                {/* Account Information - Thông tin tài khoản */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <FaShieldAlt className="me-2" />
                    Account Details
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <p className="mb-1"><strong>Username:</strong></p>
                        <p className="text-muted mb-2">{student.profile.username}</p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-1"><strong>Secret Question:</strong></p>
                        <p className="text-muted mb-2">{student.profile.secretQuestion}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Address Information - Thông tin địa chỉ */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <FaMapMarkerAlt className="me-2" />
                    Address Information
                  </Card.Header>
                  <Card.Body>
                    <p className="mb-1"><strong>Street:</strong></p>
                    <p className="text-muted mb-2">{student.profile.street}</p>
                    <Row>
                      <Col md={6}>
                        <p className="mb-1"><strong>City:</strong></p>
                        <p className="text-muted mb-2">{student.profile.city}</p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-1"><strong>State/Province:</strong></p>
                        <p className="text-muted mb-2">{student.profile.state}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <p className="mb-1"><strong>ZIP/Postal Code:</strong></p>
                        <p className="text-muted mb-2">{student.profile.zipCode}</p>
                      </Col>
                      <Col md={6}>
                        <p className="mb-1"><strong>Country:</strong></p>
                        <p className="text-muted mb-0">{student.profile.country}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            )}
            
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <FaIdCard className="me-2" />
                Student Information
              </h6>
              <p className="text-muted">
                This student is currently enrolled in our program. 
                {student.profile ? ' Complete profile information is available above.' : ' Profile information will be available once the student completes their profile setup.'}
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <FaTimes className="me-2" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// PropTypes validation - Kiểm tra kiểu dữ liệu props
StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      secretQuestion: PropTypes.string,
      answer: PropTypes.string,
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipCode: PropTypes.string,
      country: PropTypes.string
    })
  }),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default StudentDetailModal;
