import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';

import { formatPrice } from '../utils/format';

const ProductCard = ({ product, onAddToCart, onToggleFavourite, isFavourite }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleToggleFavourite = () => {
    onToggleFavourite(product);
  };

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

  return (
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

        <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleViewDetails}
            className="flex-fill"
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          
          <Button
            variant="success"
            size="sm"
            onClick={handleAddToCart}
            className="flex-fill"
          >
            <FaCartPlus className="me-1" />
            Add to Cart
          </Button>
          
          <Button
            variant={isFavourite ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleToggleFavourite}
            className="flex-fill"
          >
            <FaHeart className="me-1" />
            Favourite
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
