import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, Spinner } from 'react-bootstrap';
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import NavbarComponent from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import { useProductFilters } from '../hooks/useProductFilters';
import { useCart } from '../contexts/CartContext';
import { useFavourites } from '../contexts/FavouritesContext';
import { useToast } from '../contexts/ToastContext';
  import api from '../services/api';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-desc');
  const [filterBy, setFilterBy] = useState('all');
  const [products, setProducts] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavourite, isFavourite, getFavouritesCount } = useFavourites();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/products');
        const normalized = (data || []).map(p => ({
          id: p.id,
          name: p.title || p.name,
          image: p.image || `https://picsum.photos/seed/${p.id}/600/400`,
              price: p.price,
          description: p.description,
          category: p.category
        }));
        setProducts(normalized);
      } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Failed to load products. Please check if the server is running.', 'danger');
      
        setProducts([
          {
            id: 1,
            name: "iPhone 14",
            image: "/phones/iphone14.jpg",
            price: 399,
            description: "iPhone 14 smartphone with great performance and features.",
            category: "iphone"
          },
          {
            id: 2,
            name: "Oppo Reno13",
            image: "/phones/oppo-reno13.jpg",
            price: 549,
            description: "Oppo Reno13 smartphone with great performance and features.",
            category: "oppo"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  const filteredProducts = useProductFilters(products, searchQuery, sortBy, filterBy);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleToggleFavourite = (product) => {
    toggleFavourite(product);
    const isFav = isFavourite(product.id);
    if (isFav) {
      showToast(`${product.name} removed from favourites`, 'info');
    } else {
      showToast(`${product.name} added to favourites`, 'success');
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleFavouritesClick = () => {
    navigate('/favourites');
  };

  if (loading) {
    return (
      <>
        <NavbarComponent
          onLoginClick={handleLoginClick}
          onCartClick={handleCartClick}
          onFavouritesClick={handleFavouritesClick}
        />
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Loading products...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavbarComponent
        onLoginClick={handleLoginClick}
        onCartClick={handleCartClick}
        onFavouritesClick={handleFavouritesClick}
      />
      <Container className="py-4">
        <h1 className="mb-4">Products</h1>

        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaFilter /></InputGroup.Text>
                  <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="oppo">OPPO</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaSort /></InputGroup.Text>
                  <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Name A→Z</option>
                    <option value="name-desc">Name Z→A</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {filteredProducts.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <ProductCard
                product={p}
                onAddToCart={handleAddToCart}
                onToggleFavourite={handleToggleFavourite}
                isFavourite={isFavourite(p.id)}
              />
            </Col>
          ))}
        </Row>
        {filteredProducts.length === 0 && (
          <Row className="mt-4">
            <Col>
              <Card className="text-center">
                <Card.Body>No mobile found.</Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
    </>
  );
}
