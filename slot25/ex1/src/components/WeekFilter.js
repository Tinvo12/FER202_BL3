import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay } from '../store/taskSlice';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './WeekFilter.css';

const WeekFilter = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.tasks.selectedDay);

  const days = ['all', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayChange = (day) => {
    dispatch(setSelectedDay(day));
  };

  return (
    <div className="week-filter">
      <h3>Filter by Day</h3>
      <ButtonGroup className="flex-wrap">
        {days.map(day => (
          <ToggleButton
            key={day}
            id={`day-${day}`}
            type="radio"
            variant={selectedDay === day ? 'primary' : 'outline-primary'}
            name="day"
            value={day}
            checked={selectedDay === day}
            onChange={() => handleDayChange(day)}
            className="mb-2"
          >
            {day === 'all' ? 'All Days' : day}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default WeekFilter; 