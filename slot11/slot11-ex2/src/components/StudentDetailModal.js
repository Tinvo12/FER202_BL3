import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaEnvelope, FaBirthdayCake, FaIdCard, FaTimes } from 'react-icons/fa';

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
            
            <div className="mb-3">
              <h6 className="text-muted mb-2">
                <FaIdCard className="me-2" />
                Student Information
              </h6>
              <p className="text-muted">
                This student is currently enrolled in our program. 
                For additional information, please contact the administration office.
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

StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default StudentDetailModal;
