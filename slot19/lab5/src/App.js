import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/Toast';
import { validateAndCleanStorage } from './utils/localStorage';
import './App.css';

function App() {
  useEffect(() => {
    // Validate and clean localStorage on app startup
    validateAndCleanStorage();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <ToastProvider>
              <Router>
                <div className="App">
                  <NavBar />
                  <main className="main-content">
                    <AppRoutes />
                  </main>
                  <Toast />
                </div>
              </Router>
            </ToastProvider>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
