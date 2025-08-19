import React, { useState, useEffect } from 'react';
import { Modal, Card, Row, Col, Toast, ToastContainer, Alert } from 'react-bootstrap';
import { FaUser, FaCheckCircle, FaUserPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProfileSuccessModal = ({ show, onHide, profileData }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (show) {
      setShowToast(true);
      console.log('Received profile data:', profileData); 
    }
  }, [show, profileData]);

  const getAvatarPreview = () => {
    if (profileData?.avatar) {
      return URL.createObjectURL(profileData.avatar);
    }
    return null;
  };

  
  const displayData = (value) => {
    return value || 'Not provided';
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered className="profile-success-modal">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-success">
            <FaCheckCircle className="me-2" />
            Your Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" className="mb-4">
            <FaUserPlus className="me-2" />
            <strong>Congratulations!</strong> Your profile has been successfully created.
          </Alert>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              {/* Avatar Section */}
              <Row className="mb-4">
                <Col className="text-center">
                  <div className="position-relative d-inline-block">
                    <div 
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                      style={{ width: '120px', height: '120px', border: '3px solid #28a745' }}
                    >
                      {getAvatarPreview() ? (
                        <img 
                          src={getAvatarPreview()} 
                          alt="Profile avatar" 
                          className="rounded-circle"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <FaUser size={50} className="text-muted" />
                      )}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* About Section */}
              <div className="mb-4">
                <h6 className="fw-bold text-primary border-bottom pb-2 mb-3">About</h6>
                <Row>
                  <Col md={6}>
                    <p className="mb-1"><strong>First Name:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.firstName)}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1"><strong>Last Name:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.lastName)}</p>
                  </Col>
                </Row>
                <p className="mb-1"><strong>Email:</strong></p>
                <p className="text-muted mb-0">{displayData(profileData?.email)}</p>
              </div>

              {/* Account Section */}
              <div className="mb-4">
                <h6 className="fw-bold text-primary border-bottom pb-2 mb-3">Account</h6>
                <Row>
                  <Col md={6}>
                    <p className="mb-1"><strong>Username:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.username)}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1"><strong>Password:</strong></p>
                    <p className="text-muted mb-2">••••••••</p>
                  </Col>
                </Row>
                <p className="mb-1"><strong>Secret Question:</strong></p>
                <p className="text-muted mb-2">{displayData(profileData?.secretQuestion)}</p>
                <p className="mb-1"><strong>Answer:</strong></p>
                <p className="text-muted mb-0">{displayData(profileData?.answer)}</p>
              </div>

              {/* Address Section */}
              <div className="mb-0">
                <h6 className="fw-bold text-primary border-bottom pb-2 mb-3">Address</h6>
                <p className="mb-1"><strong>Street:</strong></p>
                <p className="text-muted mb-2">{displayData(profileData?.street)}</p>
                <Row>
                  <Col md={6}>
                    <p className="mb-1"><strong>City:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.city)}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1"><strong>State/Province:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.state)}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <p className="mb-1"><strong>ZIP/Postal Code:</strong></p>
                    <p className="text-muted mb-2">{displayData(profileData?.zipCode)}</p>
                  </Col>
                  <Col md={6}>
                    <p className="mb-1"><strong>Country:</strong></p>
                    <p className="text-muted mb-0">{displayData(profileData?.country)}</p>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-success" onClick={onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast}
          onClose={() => setShowToast(false)}
          bg="success" 
          delay={5000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>
            <FaCheckCircle className="me-2" />
            Profile created successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileSuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.object,
    username: PropTypes.string,
    password: PropTypes.string,
    secretQuestion: PropTypes.string,
    answer: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string
  })
};

export default ProfileSuccessModal;