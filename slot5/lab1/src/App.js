import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Hero from './components/Hero';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';
import RequestFormModal from './components/RequestFormModal';
import { Toast, ToastContainer, Alert, Container, Row, Col, Dropdown, Pagination } from 'react-bootstrap';
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
  const [sortOption, setSortOption] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [favourites, setFavourites] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

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

    // Apply sorting
    const sorted = [...next];
    switch (sortOption) {
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'prep-asc':
        sorted.sort((a, b) => a.prep - b.prep);
        break;
      case 'prep-desc':
        sorted.sort((a, b) => b.prep - a.prep);
        break;
      case 'cook-asc':
        sorted.sort((a, b) => a.cook - b.cook);
        break;
      case 'cook-desc':
        sorted.sort((a, b) => b.cook - a.cook);
        break;
      default:
        break;
    }

    setFilteredRecipes(sorted);
    if (next.length === 0) {
      setAlertMessage('Không tìm thấy công thức nào phù hợp.');
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    // Reset to first page when filters/sort change
    setCurrentPage(1);
  }, [recipes, searchTerm, prepFilter, cookFilter, sortOption]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleAddToCart = (recipe) => {
    setToastMessage(`${recipe.title} has been added to your cart!`);
    setShowToast(true);
  };

  const handleAddToFavourite = (recipe) => {
    setFavourites(prev => {
      const exists = prev.some(r => r.title === recipe.title);
      if (exists) return prev;
      return [...prev, recipe];
    });
    setToastMessage('Added to favourites');
    setShowToast(true);
  };

  const handleRemoveFavourite = (recipe) => {
    setFavourites(prev => prev.filter(r => r.title !== recipe.title));
    setToastMessage('Removed from favourites');
    setShowToast(true);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIdx, startIdx + itemsPerPage);

  const goToFirst = () => setCurrentPage(1);
  const goToPrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const goToPage = (p) => setCurrentPage(p);
  const goToNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const goToLast = () => setCurrentPage(totalPages);

  return (
    <div className="App">
      <Header 
        favouritesCount={favourites.length}
        onOpenRequestForm={() => setShowRequestForm(true)}
      />
      <Hero 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        sortOption={sortOption}
      />
      {showAlert && (
        <div className="container mt-3">
          <Alert variant="warning" dismissible onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </div>
      )}
      <RecipeList 
        recipes={paginatedRecipes} 
        onViewRecipe={handleViewRecipe}
        onAddFavourite={handleAddToFavourite}
        onRemoveFavourite={handleRemoveFavourite}
        favourites={favourites}
      />

      <Container className="my-4">
        <Row className="align-items-center">
          <Col xs="auto" className="mb-2 mb-sm-0">
            <Dropdown>
              <Dropdown.Toggle variant="light">
                Items per page: {itemsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[6, 9, 12].map(n => (
                  <Dropdown.Item key={n} onClick={() => handleItemsPerPageChange(n)}>
                    {n}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Pagination className="mb-0 justify-content-end">
              <Pagination.First onClick={goToFirst} disabled={safeCurrentPage === 1} />
              <Pagination.Prev onClick={goToPrev} disabled={safeCurrentPage === 1} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <Pagination.Item key={p} active={p === safeCurrentPage} onClick={() => goToPage(p)}>
                  {p}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={goToNext} disabled={safeCurrentPage === totalPages} />
              <Pagination.Last onClick={goToLast} disabled={safeCurrentPage === totalPages} />
            </Pagination>
          </Col>
        </Row>
      </Container>
      <Footer />
      
      <RecipeModal
        show={showModal}
        onHide={() => setShowModal(false)}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
      />

      <RequestFormModal
        show={showRequestForm}
        onHide={() => setShowRequestForm(false)}
      />

      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={5000}
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
