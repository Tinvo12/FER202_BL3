import './App.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { FavouritesProvider } from './contexts/FavouritesContext'
import { ToastProvider } from './contexts/ToastContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavouritesProvider>
          <ToastProvider>
            <div className='container py-4'>
              <AppRoutes />
            </div>
          </ToastProvider>
        </FavouritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
