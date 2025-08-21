# Cart Application using React useContext

This is a simple cart application built with React that demonstrates the use of `useContext` Hook for state management.

## Features

- **Dishes List**: Display a grid of food items with images, descriptions, and prices
- **Add to Cart**: Click "Add to Cart" button to add items to your shopping cart
- **Cart Management**: View cart items, remove individual items, or clear the entire cart
- **Persistent Storage**: Cart data is saved to localStorage and persists across page reloads
- **Responsive Design**: Works on both desktop and mobile devices

## Project Structure

```
src/
├── App.js              # Main application component
├── CartContext.js      # Context provider for cart state management
├── DishesList.js       # Component to display available dishes
├── Cart.js            # Component to display cart contents
└── styles.css         # Styling for the application
```

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How it Works

### useContext Implementation

The application uses React's `useContext` Hook to share cart state between components:

1. **CartContext**: Created using `React.createContext()` to provide cart state globally
2. **CartProvider**: Wraps the app and provides cart functions (add, remove, clear)
3. **Child Components**: Use `useContext(CartContext)` to access cart state and functions

### Key Functions

- `addToCart(dish)`: Adds a dish to the cart
- `removeFromCart(id)`: Removes a specific dish by ID
- `clearCart()`: Removes all items from the cart
- `totalValue`: Calculates total cart value using `reduce()`

### Data Persistence

Cart items are automatically saved to localStorage and restored when the page reloads.

## Sample Dishes

The application includes 4 sample dishes:
- Uthappizza ($4.99)
- Zucchipakoda ($1.99)
- Vadonut ($1.99)
- ElaiCheese Cake ($2.99)

## Technologies Used

- React 19.1.1
- React Hooks (useContext, useState, useEffect)
- CSS3 with responsive design
- localStorage for data persistence

## Learning Objectives

This project demonstrates:
- How to create and use React Context
- State management without prop drilling
- Functional component patterns
- Local storage integration
- Responsive UI design
