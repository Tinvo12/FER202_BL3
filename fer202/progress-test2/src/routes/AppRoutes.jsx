import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import FavouritesPage from '../pages/FavouritesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/favourites" element={<FavouritesPage />} />
    </Routes>
  );
}
