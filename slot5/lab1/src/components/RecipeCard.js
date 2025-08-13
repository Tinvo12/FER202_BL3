import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaUsers, FaClock, FaUtensils, FaHeart } from 'react-icons/fa';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onViewRecipe, onAddFavourite }) => {
  return (
    <Card className="recipe-card">
      <div className="recipe-image-container">
        <Card.Img 
          variant="top" 
          src={recipe.image} 
          alt={recipe.title}
          className="recipe-image"
          loading="lazy"
        />
      </div>
      <Card.Body className="recipe-card-body">
        <Card.Title className="recipe-title">{recipe.title}</Card.Title>
        <Card.Text className="recipe-description">
          {recipe.description}
        </Card.Text>
        
        <div className="recipe-details">
          <div className="detail-item">
            <FaUsers className="detail-icon" />
            <span>Servings: {recipe.servings}</span>
          </div>
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>Prep: {recipe.prep} mins</span>
          </div>
          <div className="detail-item">
            <FaUtensils className="detail-icon" />
            <span>Cook: {recipe.cook} mins</span>
          </div>
        </div>
        
        <div className="d-flex gap-2">
          <Button 
            variant="outline-danger" 
            className="flex-grow-1"
            onClick={() => onAddFavourite && onAddFavourite(recipe)}
          >
            <FaHeart className="me-2" /> Add to Favourite
          </Button>
          <Button 
            variant="success" 
            className="view-recipe-btn flex-grow-1"
            onClick={() => onViewRecipe(recipe)}
          >
            View Recipe
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
