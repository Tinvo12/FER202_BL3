import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { addToast } = useToast();
  const { isDark } = useTheme();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Row>
          <Col className="text-center">
            <h2>Product not found</h2>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    addToast('Added to cart', 'success');
  };

  const handleAddToFavourites = () => {
    addToFavourites(product);
    addToast('Added to favourites', 'success');
  };

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Card className={`${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Img 
              variant="top" 
              src={product.image} 
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className={`h-100 ${isDark ? 'bg-dark text-light' : ''}`}>
            <Card.Body>
              <Card.Title className="h3">{product.name}</Card.Title>
              
              <div className="mb-3">
                <Badge bg="primary" className="me-2">
                  ⭐ {product.rating} ({product.reviews} reviews)
                </Badge>
                <Badge bg="secondary" className="me-2">
                  {product.category}
                </Badge>
                <Badge bg="info">
                  🕒 {product.cookingTime}
                </Badge>
              </div>
              
              <Card.Text className="h5 text-success mb-3">
                ${product.price}
              </Card.Text>
              
              <Card.Text>
                {product.description}
              </Card.Text>
              
              <div className="mb-3">
                <h6>Ingredients:</h6>
                <ListGroup variant="flush">
                  {product.ingredients.map((ingredient, index) => (
                    <ListGroup.Item 
                      key={index}
                      className={isDark ? 'bg-dark text-light' : ''}
                    >
                      • {ingredient}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              
              <div className="mb-3">
                <strong>Servings:</strong> {product.servings} people
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                
                <Button 
                  variant={isInFavourites(product.id) ? "warning" : "outline-danger"}
                  onClick={handleAddToFavourites}
                >
                  {isInFavourites(product.id) ? '❤️ In Favourites' : '🤍 Add to Favourite'}
                </Button>
                
                <Button 
                  variant="outline-primary"
                  onClick={() => navigate('/products')}
                >
                  Back to List
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
