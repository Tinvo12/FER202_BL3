import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { Card, Form, Button } from 'react-bootstrap';
import './AddTaskForm.css';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('Monday');
  const dispatch = useDispatch();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ title: title.trim(), day }));
      setTitle('');
      setDay('Monday');
    }
  };

  return (
    <Card className="add-task-form shadow-sm">
      <Card.Body>
        <Card.Title>Add New Study Task</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Review React hooks"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="day">
            <Form.Label>Day</Form.Label>
            <Form.Select value={day} onChange={(e) => setDay(e.target.value)}>
              {days.map(dayOption => (
                <option key={dayOption} value={dayOption}>
                  {dayOption}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" variant="primary">Add Task</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddTaskForm; 