import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ onSearch, onFilterChange }) => {
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
