import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks } from '../store/taskSlice';
import { Button } from 'react-bootstrap';
import './ResetButton.css';

const ResetButton = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      dispatch(resetTasks());
    }
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="reset-button-container">
      <Button onClick={handleReset} variant="outline-danger" className="w-100">
        Reset All Tasks
      </Button>
    </div>
  );
};

export default ResetButton; 