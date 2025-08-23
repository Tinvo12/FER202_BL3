import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  if (!user) {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h2>Please login to view your profile</h2>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className={`text-center ${isDark ? 'text-light' : 'text-dark'}`}>
            User Profile
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body>
              <div className="text-center mb-4">
                <div 
                  className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px', fontSize: '2rem' }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              <Card.Title className="text-center h4 mb-4">
                {user.name || 'User'}
              </Card.Title>

              <div className="mb-3">
                <strong>Email:</strong>
                <p className="text-muted">{user.email}</p>
              </div>

              {user.phone && (
                <div className="mb-3">
                  <strong>Phone:</strong>
                  <p className="text-muted">{user.phone}</p>
                </div>
              )}

              {user.address && (
                <div className="mb-3">
                  <strong>Address:</strong>
                  <p className="text-muted">{user.address}</p>
                </div>
              )}

              <div className="mb-3">
                <strong>Member Since:</strong>
                <p className="text-muted">
                  {user.id ? new Date(user.id).toLocaleDateString() : 'Recently'}
                </p>
              </div>

              <div className="d-grid gap-2">
                <Button variant="outline-primary">
                  Edit Profile
                </Button>
                <Button variant="outline-secondary">
                  Change Password
                </Button>
                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
