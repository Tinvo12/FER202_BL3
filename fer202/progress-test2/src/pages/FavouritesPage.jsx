import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaHeart, FaArrowLeft, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { useFavourites } from '../contexts/FavouritesContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const FavouritesPage = () => {
  const navigate = useNavigate();
  const { favourites, removeFromFavourites } = useFavourites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Hàm xử lý đường dẫn ảnh
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (/^https?:\/\//i.test(imagePath)) return imagePath; // URL tuyệt đối
    
    // Xử lý đường dẫn từ db.json: "images/phones/..." -> "/images/phones/..."
    if (imagePath.startsWith('images/')) {
      return '/' + imagePath;
    }
    
    return '/' + imagePath.replace(/^\/+/, '');
  };

  const handleRemoveFavourite = (product) => {
    removeFromFavourites(product.id);
    showToast(`${product.name} removed from favourites`, 'info');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/products')}
          className="me-3"
        >
          <FaArrowLeft className="me-2" />
          Back to Products
        </Button>
        <h1 className="mb-0">
          <FaHeart className="text-danger me-2" />
          My Favourites
        </h1>
      </div>

      {favourites.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <FaHeart size={64} className="text-muted mb-3" />
            <h3>No Favourites Yet</h3>
            <p className="text-muted">You haven't added any products to your favourites.</p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {favourites.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm product-card">
                <Card.Img
                  variant="top"
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="h6 mb-2">{product.name}</Card.Title>
                  <Card.Text className="flex-grow-1 small text-muted mb-2">
                    {product.description}
                  </Card.Text>
                  
                  <div className="mb-3">
                    <Badge bg="primary" className="fs-6">
                      {formatPrice(product.price)}
                    </Badge>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart className="me-1" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveFavourite(product)}
                    >
                      <FaTrash className="me-1" />
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FavouritesPage;
