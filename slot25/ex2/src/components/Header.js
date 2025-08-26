import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const state = useSelector(s => s.tours);
  return (
    <div className="bg-info p-3 text-white text-center">
      <h1>{state.agencyName}</h1>
      <p>{state.location}</p>
    </div>
  );
}