import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const TourContext = createContext();

const initialState = {
  agencyName: '',
  location: '',
  tours: [],
  filteredTours: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        agencyName: action.payload.agencyName,
        location: action.payload.location,
        tours: action.payload.tours,
        filteredTours: action.payload.tours
      };
    case 'FILTER_PRICE':
      return {
        ...state,
        filteredTours: state.tours.filter(t => t.price <= action.payload)
      };
    default:
      return state;
  }
}

export const TourProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('http://localhost:5000/travelAgency')
      .then(res => {
        dispatch({ type: 'SET_DATA', payload: res.data });
      });
  }, []);

  return (
    <TourContext.Provider value={{ state, dispatch }}>
      {children}
    </TourContext.Provider>
  );
};