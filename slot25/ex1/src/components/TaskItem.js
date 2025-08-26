import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask } from '../store/taskSlice';
import { Form } from 'react-bootstrap';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <Form.Check
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-checkbox"
        label={<span className="task-title">{task.title}</span>}
      />
    </div>
  );
};

export default TaskItem; 