import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Carousel from '../components/Carousel';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  return (
    <Container>
      <Carousel />
      
      <Row className="mb-4">
        <Col>
          <h2 className={`text-center ${isDark ? 'text-light' : 'text-dark'}`}>
            Welcome to Food Store
          </h2>
          <p className={`text-center ${isDark ? 'text-light' : 'text-dark'}`}>
            Discover delicious meals and amazing flavors from around the world.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body className="text-center">
              <h3>🍕 Fresh Ingredients</h3>
              <p>We use only the finest and freshest ingredients in all our dishes.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body className="text-center">
              <h3>🚚 Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep within 30 minutes.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body className="text-center">
              <h3>⭐ Best Quality</h3>
              <p>Highest quality standards maintained in every dish we serve.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
