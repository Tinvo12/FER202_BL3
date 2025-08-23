import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToFavourites, isInFavourites } = useFavourites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    addToast('Added to cart', 'success');
  };

  const handleAddToFavourites = () => {
    if (isInFavourites(product.id)) {
      navigate('/favourites');
    } else {
      addToFavourites(product);
      addToast('Added to favourites', 'success');
    }
  };

  return (
    <Card className="h-100 product-card">
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
          <Badge bg="primary" className="me-2">
            ⭐ {product.rating} ({product.reviews})
          </Badge>
          <Badge bg="secondary">
            {product.category}
          </Badge>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="h5 mb-0">${product.price}</span>
        </div>
        
        <div className="d-grid gap-2">
          <Button 
            variant="outline-primary" 
            as={Link} 
            to={`/product/${product.id}`}
          >
            View Details
          </Button>
          
          <Button 
            variant="success" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          
          <Button 
            variant={isInFavourites(product.id) ? "warning" : "outline-danger"}
            onClick={handleAddToFavourites}
          >
            {isInFavourites(product.id) ? 'Browse to My Favourites' : 'Add to Favourite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
