import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useTheme } from '../context/ThemeContext';

const Favourites = () => {
  const { items, removeFromFavourites, clearFavourites } = useFavourites();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
              <Card.Body>
                <h2>No favourites yet</h2>
                <p>Start adding your favourite dishes!</p>
                <Button variant="primary" onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className={`${isDark ? 'text-light' : 'text-dark'}`}>
            My Favourites ({items.length})
          </h2>
          <Button variant="outline-danger" onClick={clearFavourites}>
            Clear All
          </Button>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {items.map(product => (
          <Col key={product.id}>
            <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
              <Card.Img 
                variant="top" 
                src={product.image} 
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {product.description}
                </Card.Text>
                
                <div className="mb-2">
                  <span className="h5 text-success">${product.price}</span>
                </div>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>
                  
                  <Button 
                    variant="outline-danger" 
                    onClick={() => removeFromFavourites(product.id)}
                  >
                    Remove from Favourites
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favourites;
