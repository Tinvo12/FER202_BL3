import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { carouselImages } from '../data/products';

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [imageFit, setImageFit] = useState('contain'); // 'contain' hoặc 'cover'

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleImageFit = () => {
    setImageFit(imageFit === 'contain' ? 'cover' : 'contain');
  };

  return (
    <div className="carousel-container mb-4">
      {/* Toggle button */}
      <button 
        onClick={toggleImageFit}
        className="btn btn-sm btn-outline-secondary position-absolute"
        style={{ 
          top: '10px', 
          right: '10px', 
          zIndex: 10,
          fontSize: '12px',
          padding: '4px 8px'
        }}
      >
        {imageFit === 'contain' ? 'Fit Cover' : 'Fit Contain'}
      </button>
      
      <BootstrapCarousel 
        activeIndex={index} 
        onSelect={handleSelect}
        indicators={true}
        controls={true}
        interval={4000}
        pause="hover"
        className="custom-carousel"
        fade={false}
      >
        {carouselImages.map((image) => (
          <BootstrapCarousel.Item key={image.id}>
            <img
              className="carousel-image"
              src={image.src}
              alt={image.alt}
              style={{ objectFit: imageFit }}
            />
            <BootstrapCarousel.Caption className="carousel-caption">
              <h2 className="carousel-title">{image.title}</h2>
              <p className="carousel-description">{image.description}</p>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
