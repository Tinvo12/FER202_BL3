export default function TourDetail({ tour }) {
    if (!tour) return <div>Select a tour to see details</div>;
  
    return (
      <div className="card m-2 p-3">
        <h4>{tour.tourName}</h4>
        <p>Duration: {tour.duration}</p>
        <p>Price: ${tour.price}</p>
        <p>Available Seats: {tour.availableSeats}</p>
      </div>
    );
  }