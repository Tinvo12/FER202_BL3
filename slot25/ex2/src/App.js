import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TourCard from './components/TourCard';
import TourDetail from './components/TourDetail';
import PriceFilter from './components/PriceFilter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTravelAgency } from './features/toursSlice';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(s => s.tours);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    if (state.status === 'idle') {
      dispatch(fetchTravelAgency());
    }
  }, [dispatch, state.status]);

  return (
    <div className="container">
      <Header />
      <PriceFilter />
      <div className="d-flex flex-wrap justify-content-center">
        {state.filteredTours.map(tour => (
          <TourCard key={tour.id} tour={tour} onClick={setSelectedTour} />
        ))}
      </div>
      <TourDetail tour={selectedTour} />
      <Footer />
    </div>
  );
}

export default App;