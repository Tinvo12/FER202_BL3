import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { FaUsers, FaClock, FaUtensils, FaShoppingCart } from 'react-icons/fa';
import './RecipeModal.css';

const RecipeModal = ({ show, onHide, recipe, onAddToCart }) => {
  if (!recipe) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="recipe-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">{recipe.title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="modal-body">
        <Row>
          <Col md={6}>
            <div className="modal-image-container">
                             <img 
                 src={recipe.image} 
                 alt={recipe.title}
                 className="modal-image"
                 loading="eager"
               />
            </div>
          </Col>
          
          <Col md={6}>
            <div className="modal-content">
              <h4 className="recipe-title-modal">{recipe.title}</h4>
              <p className="recipe-description-modal">{recipe.description}</p>
              
              <div className="recipe-details-modal">
                <div className="detail-item-modal">
                  <FaUsers className="detail-icon-modal" />
                  <span><strong>Servings:</strong> {recipe.servings}</span>
                </div>
                <div className="detail-item-modal">
                  <FaClock className="detail-icon-modal" />
                  <span><strong>Prep Time:</strong> {recipe.prep} minutes</span>
                </div>
                <div className="detail-item-modal">
                  <FaUtensils className="detail-icon-modal" />
                  <span><strong>Cook Time:</strong> {recipe.cook} minutes</span>
                </div>
              </div>
              
              <div className="modal-actions">
                <Button 
                  variant="success" 
                  className="add-to-cart-btn"
                  onClick={() => {
                    onAddToCart(recipe);
                    onHide();
                  }}
                >
                  <FaShoppingCart className="cart-icon" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="close-btn"
                  onClick={onHide}
                >
                  Close
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeModal;
