import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Dropdown, Carousel } from 'react-bootstrap';
import { FaSearch, FaSortAlphaDown, FaSortAmountDown } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ onSearch, onFilterChange, onSortChange, sortOption }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('Max Prep Time');
  const [maxCookTime, setMaxCookTime] = useState('Max Cook Time');

  useEffect(() => {
    const handle = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handle);
  }, [searchTerm, onSearch]);

  const handlePrepTimeChange = (time) => {
    setMaxPrepTime(time);
    onFilterChange({ prep: time, cook: maxCookTime });
  };

  const handleCookTimeChange = (time) => {
    setMaxCookTime(time);
    onFilterChange({ prep: maxPrepTime, cook: time });
  };

  return (
    <section className="hero-section">
      <Container>
        <Row className="mb-4">
          <Col>
            <Carousel className="hero-carousel">
              <Carousel.Item>
                <img className="hero-carousel-img" src="/images/OIP (8).jpg" alt="Slide 1" />
                <Carousel.Caption>
                  <h3>Fresh and Fast</h3>
                  <p>Healthy recipes for busy days.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="hero-carousel-img" src="/images/OIP (9).jpg" alt="Slide 2" />
                <Carousel.Caption>
                  <h3>Protein Packed</h3>
                  <p>Fuel your body, feel great.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="hero-carousel-img" src="/images/OIP (10).jpg" alt="Slide 3" />
                <Carousel.Caption>
                  <h3>Sweet and Simple</h3>
                  <p>Guilt-free desserts and snacks.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center text-center">
          <Col lg={10}>
            <h1 className="hero-title">
              Explore our simple, healthy recipes
            </h1>
            <p className="hero-description">
              Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
              Use the search bar to find a recipe by name or ingredient, or simply scroll the list and 
              let something delicious catch your eye.
            </p>
          </Col>
        </Row>

        <Row className="align-items-center g-3 hero-controls">
          <Col xs={12} md="auto" >
            <Dropdown>
              <Dropdown.Toggle variant="light" className="filter-dropdown">
                {maxPrepTime}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handlePrepTimeChange('Max Prep Time')}>Any</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrepTimeChange('5 mins')}>5 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrepTimeChange('10 mins')}>10 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrepTimeChange('15 mins')}>15 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrepTimeChange('20 mins')}>20 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePrepTimeChange('30 mins')}>30 mins</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="light" className="filter-dropdown">
                {maxCookTime}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCookTimeChange('Max Cook Time')}>Any</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCookTimeChange('5 mins')}>5 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCookTimeChange('10 mins')}>10 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCookTimeChange('15 mins')}>15 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCookTimeChange('20 mins')}>20 mins</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCookTimeChange('30 mins')}>30 mins</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} md="auto">
            <Dropdown>
              <Dropdown.Toggle variant="light" className="filter-dropdown">
                Sort by
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header><FaSortAlphaDown className="me-2" />Name</Dropdown.Header>
                <Dropdown.Item active={sortOption==='name-asc'} onClick={() => onSortChange('name-asc')}>A → Z</Dropdown.Item>
                <Dropdown.Item active={sortOption==='name-desc'} onClick={() => onSortChange('name-desc')}>Z → A</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header><FaSortAmountDown className="me-2" />Prep</Dropdown.Header>
                <Dropdown.Item active={sortOption==='prep-asc'} onClick={() => onSortChange('prep-asc')}>Prep ↑</Dropdown.Item>
                <Dropdown.Item active={sortOption==='prep-desc'} onClick={() => onSortChange('prep-desc')}>Prep ↓</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header><FaSortAmountDown className="me-2" />Cook</Dropdown.Header>
                <Dropdown.Item active={sortOption==='cook-asc'} onClick={() => onSortChange('cook-asc')}>Cook ↑</Dropdown.Item>
                <Dropdown.Item active={sortOption==='cook-desc'} onClick={() => onSortChange('cook-desc')}>Cook ↓</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col xs={12} md className="d-flex justify-content-md-end">
            <Form className="search-form">
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search by name or ingredient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
