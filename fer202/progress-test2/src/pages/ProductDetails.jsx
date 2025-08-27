import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart } from 'react-icons/fa';
import { formatPrice } from '../utils/format';
import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';
import { useToast } from '../contexts/ToastContext';
import api from '../services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite } = useFavourites();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        setProduct({
          id: data.id,
          name: data.title || data.name,
          image: data.image || `https://picsum.photos/seed/${data.id}/600/400`,
          price: data.price,
          description: data.description,
          category: data.category
        });
      } catch (error) {
        showToast('Product not found', 'danger');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate, showToast]);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleToggleFavourite = () => {
    toggleFavourite(product);
    const isFav = isFavourite(product.id);
    showToast(
      isFav 
        ? `${product.name} added to favourites` 
        : `${product.name} removed from favourites`,
      isFav ? 'success' : 'info'
    );
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

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')}>
          <FaArrowLeft className="me-2" />
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/products')}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Back to Products
      </Button>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={getImageUrl(product.image)}
              alt={product.name}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h3 mb-3">{product.name}</Card.Title>
              <Card.Text className="text-muted mb-3">
                {product.description}
              </Card.Text>
              
              <div className="mb-3">
                <Badge bg="primary" className="fs-5 p-2">
                  {formatPrice(product.price)}
                </Badge>
              </div>

              <div className="mb-3">
                <Badge bg="secondary" className="me-2">
                  Category: {product.category}
                </Badge>
              </div>

              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <FaCartPlus className="me-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant={isFavourite(product.id) ? "danger" : "outline-danger"}
                  size="lg"
                  onClick={handleToggleFavourite}
                >
                  <FaHeart className="me-2" />
                  {isFavourite(product.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
