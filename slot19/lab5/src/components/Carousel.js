import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel, Button, ButtonGroup } from 'react-bootstrap';
import { carouselImages } from '../data/products';

const Carousel = () => {
  
  const [index, setIndex] = useState(0);
  
  
  const [imageFit, setImageFit] = useState('contain');
  
  
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  
  useEffect(() => {
    let interval;
    
    if (isAutoPlay) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }, 4000);
    }

   
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlay]); 

 
  const toggleImageFit = () => {
    setImageFit(imageFit === 'contain' ? 'cover' : 'contain');
  };

  
  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  
  const goToPrevious = () => {
    setIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  return (
    <div className="carousel-container mb-4 position-relative">
      
      <div className="carousel-controls position-absolute" 
           style={{ 
             top: '10px', 
             right: '10px', 
             zIndex: 15,
             display: 'flex',
             gap: '5px'
           }}>
        
        
        <Button
          variant={isAutoPlay ? 'success' : 'secondary'}
          size="sm"
          onClick={toggleAutoPlay}
          title={isAutoPlay ? 'Tắt Auto Play' : 'Bật Auto Play'}
        >
          {isAutoPlay ? '⏸️' : '▶️'}
        </Button>
        
        
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleImageFit}
          title={imageFit === 'contain' ? 'Chuyển sang Cover' : 'Chuyển sang Contain'}
        >
          {imageFit === 'contain' ? '📐' : '🖼️'}
        </Button>
      </div>

     
      <div className="carousel-manual-nav position-absolute" 
           style={{ 
             top: '50%', 
             left: '10px', 
             right: '10px',
             transform: 'translateY(-50%)',
             zIndex: 10,
             display: 'flex',
             justifyContent: 'space-between',
             pointerEvents: 'none' 
           }}>
        
        
        <Button
          variant="dark"
          size="sm"
          onClick={goToPrevious}
          style={{ 
            opacity: 0.8,
            pointerEvents: 'auto' 
          }}
          title="Slide trước"
        >
          ‹
        </Button>
        
        
        <Button
          variant="dark"
          size="sm"
          onClick={goToNext}
          style={{ 
            opacity: 0.8,
            pointerEvents: 'auto' 
          }}
          title="Slide sau"
        >
          ›
        </Button>
      </div>

     
      <BootstrapCarousel 
        activeIndex={index} 
        onSelect={handleSelect}
        indicators={true} 
        controls={false} 
        interval={null} 
        pause="hover"
        className="custom-carousel"
        fade={false}
      >
        {carouselImages.map((image, imageIndex) => (
          <BootstrapCarousel.Item key={image.id}>
            <img
              className="carousel-image"
              src={image.src}
              alt={image.alt}
              style={{ objectFit: imageFit }}
            />
            
            
            <div className="custom-indicators position-absolute" 
                 style={{ 
                   bottom: '20px', 
                   left: '50%', 
                   transform: 'translateX(-50%)',
                   zIndex: 10,
                   display: 'flex',
                   gap: '8px'
                 }}>
              {carouselImages.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  className={`indicator-dot ${dotIndex === index ? 'active' : ''}`}
                  onClick={() => setIndex(dotIndex)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: dotIndex === index ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  title={`Chuyển đến slide ${dotIndex + 1}`}
                />
              ))}
            </div>
            
            <BootstrapCarousel.Caption className="carousel-caption">
              <h2 className="carousel-title">{image.title}</h2>
              <p className="carousel-description">{image.description}</p>
              
             
              <div className="slide-counter" 
                   style={{ 
                     fontSize: '14px', 
                     opacity: 0.8,
                     marginTop: '10px'
                   }}>
                {imageIndex + 1} / {carouselImages.length}
              </div>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
