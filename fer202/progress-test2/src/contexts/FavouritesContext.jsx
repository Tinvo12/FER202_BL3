import React, { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (product) => {
    setFavourites(prev => {
      const isFavourite = prev.find(f => f.id === product.id);
      if (isFavourite) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavourites = (productId) => {
    setFavourites(prev => prev.filter(f => f.id !== productId));
  };

  const toggleFavourite = (product) => {
    setFavourites(prev => {
      const isFavourite = prev.find(f => f.id === product.id);
      if (isFavourite) {
        return prev.filter(f => f.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isFavourite = (productId) => {
    return favourites.some(f => f.id === productId);
  };

  const getFavouritesCount = () => {
    return favourites.length;
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    toggleFavourite,
    isFavourite,
    getFavouritesCount,
    clearFavourites
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
