import React, { useState, useEffect } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles.css";


const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/OIP (5).jpg",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/OIP (7).jpg",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/OIP (3).jpg",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/OIP (4).jpg",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

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
