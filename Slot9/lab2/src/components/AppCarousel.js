import React from 'react';
import { Carousel } from 'react-bootstrap';
import { movies } from '../movies';

const AppCarousel = () => {
  const highlightIds = [6, 1, 4];
  const highlighted = movies.filter((m) => highlightIds.includes(m.id));
  const slides = highlighted.length >= 3 ? highlighted : movies.slice(0, 3);

  return (
  <Carousel className="mb-4" interval={4000} pause="hover" fade>
    {slides.map((movie) => (
      <Carousel.Item key={movie.id}>
        <img
          className="d-block w-100 carousel-img"
          src={movie.poster}
          alt={`${movie.title} banner`}
        />
        <Carousel.Caption>
          <div className="carousel-caption-bg p-3 rounded">
            <h3 className="mb-1">{movie.title}</h3>
            <p className="mb-0">{movie.description.slice(0, 90)}...</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
  );
};

export default AppCarousel;