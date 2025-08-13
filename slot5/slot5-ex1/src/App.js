import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';
import { Toast, ToastContainer, Alert } from 'react-bootstrap';
import './App.css';

const recipesData = [
  {
    "title": "Mediterranean Chickpea Salad",
    "description": "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    "servings": 2,
    "prep": 10,
    "cook": 0,
    "image": "/images/OIP (1).jpg"
  },
  {
    "title": "Avocado & Tomato Wholegrain Toast",
    "description": "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    "servings": 1,
    "prep": 5,
    "cook": 5,
    "image": "/images/OIP (2).jpg"
  },
  {
    "title": "One-Pan Lemon Garlic Salmon",
    "description": "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    "servings": 2,
    "prep": 5,
    "cook": 12,
    "image": "/images/OIP (3).jpg"
  },
  {
    "title": "Quinoa Veggie Power Bowl",
    "description": "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    "servings": 2,
    "prep": 10,
    "cook": 15,
    "image": "/images/OIP (4).jpg"
  },
  {
    "title": "Sweet Potato Black Bean Tacos",
    "description": "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    "servings": 3,
    "prep": 10,
    "cook": 15,
    "image": "/images/OIP (5).jpg"
  },
  {
    "title": "Greek Yogurt Berry Parfait",
    "description": "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    "servings": 1,
    "prep": 5,
    "cook": 0,
    "image": "/images/OIP (6).jpg"
  },
  {
    "title": "Lentil & Spinach Soup",
    "description": "A hearty 30-minute soup rich in plant protein and iron.",
    "servings": 4,
    "prep": 10,
    "cook": 20,
    "image": "/images/OIP (7).jpg"
  },
  {
    "title": "Banana Oat Pancakes",
    "description": "Flour-free pancakes sweetened naturally with ripe bananas.",
    "servings": 2,
    "prep": 5,
    "cook": 10,
    "image": "/images/OIP (1).jpg"
  }
];

function App() {
  const [recipes, setRecipes] = useState(recipesData);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [prepFilter, setPrepFilter] = useState('Max Prep Time');
  const [cookFilter, setCookFilter] = useState('Max Cook Time');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters) => {
    if (typeof filters.prep !== 'undefined') setPrepFilter(filters.prep);
    if (typeof filters.cook !== 'undefined') setCookFilter(filters.cook);
  };

  useEffect(() => {
    let next = recipes;

    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      next = next.filter(recipe =>
        recipe.title.toLowerCase().includes(trimmed) ||
        recipe.description.toLowerCase().includes(trimmed)
      );
    }

    const parsedPrep = parseInt(prepFilter);
    if (!isNaN(parsedPrep)) {
      next = next.filter(recipe => recipe.prep <= parsedPrep);
    }

    const parsedCook = parseInt(cookFilter);
    if (!isNaN(parsedCook)) {
      next = next.filter(recipe => recipe.cook <= parsedCook);
    }

    setFilteredRecipes(next);
    if (next.length === 0) {
      setAlertMessage('Không tìm thấy công thức nào phù hợp.');
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [recipes, searchTerm, prepFilter, cookFilter]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleAddToCart = (recipe) => {
    setToastMessage(`${recipe.title} has been added to your cart!`);
    setShowToast(true);
  };

  return (
    <div className="App">
      <Header />
      <Hero onSearch={handleSearch} onFilterChange={handleFilterChange} />
      {showAlert && (
        <div className="container mt-3">
          <Alert variant="warning" dismissible onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}
      <RecipeList recipes={filteredRecipes} onViewRecipe={handleViewRecipe} />
      <Footer />
      
      <RecipeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
