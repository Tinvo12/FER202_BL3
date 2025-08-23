import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { useTheme } from '../context/ThemeContext';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { isDark } = useTheme();

  // Use useMemo for filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className={`text-center ${isDark ? 'text-light' : 'text-dark'}`}>
            Our Products
          </h2>
        </Col>
      </Row>

      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              🔍
            </Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Results count */}
      <Row className="mb-3">
        <Col>
          <p className={`${isDark ? 'text-light' : 'text-dark'}`}>
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredAndSortedProducts.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {filteredAndSortedProducts.length === 0 && (
        <Row className="mt-4">
          <Col className="text-center">
            <p className={`${isDark ? 'text-light' : 'text-dark'}`}>
              No products found matching your criteria.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Products;
