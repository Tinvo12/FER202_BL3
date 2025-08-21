import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";


const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedQuery = searchTerm.trim().toLowerCase();
  const filteredDishes = normalizedQuery
    ? dishes.filter(
        (dish) =>
          dish.name.toLowerCase().includes(normalizedQuery) ||
          dish.description.toLowerCase().includes(normalizedQuery)
      )
    : dishes;

  return (
    <div>
      <h2>Danh sách món ăn</h2>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên hoặc mô tả..."
        />
      </div>
      <div className="dishes">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{`Price: $${parseFloat(dish.price).toFixed(2)}`}</p>
            <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        ))}
        {filteredDishes.length === 0 && (
          <p className="muted">Không tìm thấy món phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default DishesList;
