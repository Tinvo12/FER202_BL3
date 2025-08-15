import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Toast } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onAddToFavorites, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFavoriteClick = () => {
    const message = isFavorite ? 'Removed from favourites!' : 'Added to favourites!';
    setToastMessage(message);
    onAddToFavorites(movie.id);
    setShowToast(true);
  };

  return (
    <>
      <Card className="movie-card h-100 shadow-sm border-0">
        <div className="position-relative">
          <Card.Img variant="top" src={movie.poster} alt={`${movie.title} poster`} className="card-img" />
          <Badge bg="dark" className="position-absolute top-0 end-0 m-2 opacity-75">
            <i className="bi bi-film me-1"></i>{movie.genre}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title className="d-flex align-items-center gap-2">
            <i className="bi bi-camera-reels text-primary"></i>
            {movie.title}
          </Card.Title>
          <Card.Text className="truncate-3">{movie.description}</Card.Text>
          <div className="small text-muted d-flex flex-wrap gap-3 mt-2">
            <span><i className="bi bi-calendar2-week me-1"></i><strong>Year:</strong> {movie.year}</span>
            <span><i className="bi bi-geo-alt me-1"></i><strong>Country:</strong> {movie.country}</span>
            <span><i className="bi bi-clock-history me-1"></i><strong>Duration:</strong> {movie.duration} min</span>
          </div>
          <div className="d-flex gap-2 mt-3">
            <Button variant="outline-primary" className="flex-fill" onClick={() => setShowModal(true)}>
              <i className="bi bi-info-circle me-1"></i>
              Details
            </Button>
            <Button
              variant={isFavorite ? 'danger' : 'success'}
              className="flex-fill"
              onClick={handleFavoriteClick}
            >
              {isFavorite ? <><i className="bi bi-heartbreak me-1"></i>Remove</> : <><i className="bi bi-heart-fill me-1"></i>Add to Favourites</>}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="d-flex align-items-center gap-2">
            <i className="bi bi-film"></i>
            {movie.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-12 col-md-5">
              <img src={movie.poster} alt={`${movie.title} poster`} className="img-fluid rounded modal-poster" />
            </div>
            <div className="col-12 col-md-7">
              <p className="mb-2"><i className="bi bi-card-text me-2"></i><strong>Description:</strong> {movie.description}</p>
              <div className="row g-2 small text-muted">
                <div className="col-6"><i className="bi bi-calendar2-week me-1"></i><strong>Year:</strong> {movie.year}</div>
                <div className="col-6"><i className="bi bi-geo-alt me-1"></i><strong>Country:</strong> {movie.country}</div>
                <div className="col-6"><i className="bi bi-clock-history me-1"></i><strong>Duration:</strong> {movie.duration} min</div>
                <div className="col-6"><i className="bi bi-tags me-1"></i><strong>Genre:</strong> {movie.genre}</div>
              </div>
              <p className="mt-3 mb-0"><i className="bi bi-megaphone me-2"></i><strong>Showtimes:</strong> Check local theaters for showtimes.</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast show={showToast} onClose={() => setShowToast(false)} delay={2200} autohide className="position-fixed bottom-0 end-0 m-3 form-toast bg-dark text-white">
        <Toast.Header>
          <strong className="me-auto">Favourites</strong>
        </Toast.Header>
        <Toast.Body><i className="bi bi-check2-circle me-2"></i>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MovieCard;