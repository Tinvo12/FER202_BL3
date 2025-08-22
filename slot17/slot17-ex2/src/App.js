import React, { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import { dishes } from "./data/dishes";
import "./styles.css";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    return () => document.body.classList.remove("dark");
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  return (
    <CartProvider>
      <div className="App">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>Food Store</h1>
          <button className="btn-secondary" onClick={toggleDark}>
            {dark ? "Chế độ Sáng" : "Chế độ Tối"}
          </button>
        </div>
        <DishesList dishes={dishes} />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
