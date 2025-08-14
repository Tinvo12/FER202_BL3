import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onViewRecipe, onAddFavourite, onRemoveFavourite, favourites }) => {
  return (
    <section className="recipe-list-section">
      <Container>
        <Row>
          {recipes.map((recipe, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <RecipeCard 
                recipe={recipe} 
                onViewRecipe={onViewRecipe}
                onAddFavourite={onAddFavourite}
                onRemoveFavourite={onRemoveFavourite}
                isFavourite={favourites?.some(r => r.title === recipe.title)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RecipeList;
