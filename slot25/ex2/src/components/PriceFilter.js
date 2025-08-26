import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByPrice } from '../features/toursSlice';

export default function PriceFilter() {
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(filterByPrice(Number(e.target.value)));
  };

  return (
    <div className="m-3">
      <input type="range" min="50" max="400" onChange={handleFilter} />
      <span>Filter by price</span>
    </div>
  );
}