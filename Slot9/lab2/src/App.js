import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { movies } from './movies';
import AppNavbar from './components/AppNavbar';
import AppCarousel from './components/AppCarousel';
import MovieCard from './components/MovieCard';
import SearchFilterBar from './components/SearchFilterBar';
import MovieRequestForm from './components/MovieRequestForm';

const App = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredMovies = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = movies.filter((movie) => {
      if (!keyword) return true;
      return (
        movie.title.toLowerCase().includes(keyword) ||
        movie.description.toLowerCase().includes(keyword)
      );
    });

    if (selectedGenre !== 'All') {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    if (sortOption === 'duration-asc') {
      result = [...result].sort((a, b) => a.duration - b.duration);
    } else if (sortOption === 'duration-desc') {
      result = [...result].sort((a, b) => b.duration - a.duration);
    }

    return result;
  }, [searchTerm, selectedGenre, sortOption]);

  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <Container className="content">
              <AppCarousel />
              <SearchFilterBar
                onSearch={setSearchTerm}
                onFilter={setSelectedGenre}
                onSort={setSortOption}
              />
              {filteredMovies.length === 0 ? (
                <Alert variant="warning" className="mt-3">No movies found</Alert>
              ) : (
                <>
                  <p className="fw-semibold mt-3">{filteredMovies.length} movie(s) found</p>
                  <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    {filteredMovies.map((movie) => (
                      <Col key={movie.id}>
                        <MovieCard
                          movie={movie}
                          onAddToFavorites={handleAddToFavorites}
                          isFavorite={favorites.includes(movie.id)}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Container>
          }
        />
        <Route
          path="/favorites"
          element={
            <Container className="content">
              <h2 className="text-2xl font-bold mb-4">My Favourite Movies</h2>
              {favoriteMovies.length === 0 ? (
                <Alert variant="info" className="mt-3">No favourites yet.</Alert>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                  {favoriteMovies.map((movie) => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        onAddToFavorites={handleAddToFavorites}
                        isFavorite={true}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          }
        />
        <Route path="/request" element={<MovieRequestForm />} />
      </Routes>
    </Router>
  );
};

export default App;