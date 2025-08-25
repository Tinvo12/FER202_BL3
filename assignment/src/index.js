import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';

// Khởi tạo dữ liệu fallback nếu chưa có
const initializeFallbackData = () => {
	// Khởi tạo accounts nếu chưa có
	if (!localStorage.getItem('accounts')) {
		const defaultAccounts = [
			{
				id: 1,
				username: "admin",
				email: "admin@example.com",
				password: "Admin@123",
				name: "Administrator",
				secretQuestion: "Your birthplace?",
				answer: "Earth",
				wishlist: [],
				avatar: "",
				address: {
					streetName: "Admin Street",
					streetNumber: "1",
					city: "Admin City",
					country: "Viet Nam"
				}
			}
		];
		localStorage.setItem('accounts', JSON.stringify(defaultAccounts));
	}

	// Khởi tạo orders nếu chưa có
	if (!localStorage.getItem('orders')) {
		localStorage.setItem('orders', JSON.stringify([]));
	}
};

// Chạy khởi tạo
initializeFallbackData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
