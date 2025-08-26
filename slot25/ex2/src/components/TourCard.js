import React from 'react';

export default function TourCard({ tour, onClick }) {
  return (
    <div className="card m-2" style={{ width: '18rem' }} onClick={() => onClick(tour)}>
      <img src={tour.img} className="card-img-top" alt={tour.tourName} />
      <div className="card-body">
        <h5 className="card-title">{tour.tourName}</h5>
        <p className="card-text">${tour.price}</p>
      </div>
    </div>
  );
}