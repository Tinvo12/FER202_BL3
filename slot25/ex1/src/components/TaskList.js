import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { Card, ListGroup, Alert } from 'react-bootstrap';
import './TaskList.css';

const TaskList = () => {
  const { tasks, selectedDay } = useSelector(state => state.tasks);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filter tasks based on selected day
  const filteredTasks = selectedDay === 'all' 
    ? tasks 
    : tasks.filter(task => task.day === selectedDay);

  // Group tasks by day
  const tasksByDay = days.reduce((acc, day) => {
    acc[day] = filteredTasks.filter(task => task.day === day);
    return acc;
  }, {});

  return (
    <div className="task-list">
      <h2>Study Tasks</h2>
      {selectedDay !== 'all' && (
        <div className="filter-info">
          Showing tasks for: <strong>{selectedDay}</strong>
        </div>
      )}

      {days.map(day => {
        const dayTasks = tasksByDay[day];
        if (selectedDay !== 'all' && selectedDay !== day) return null;

        return (
          <Card key={day} className="mb-3">
            <Card.Header as="h5">{day}</Card.Header>
            <Card.Body className="p-0">
              {dayTasks.length === 0 ? (
                <Alert variant="light" className="m-3 mb-0">No tasks for {day}</Alert>
              ) : (
                <ListGroup variant="flush">
                  {dayTasks.map(task => (
                    <ListGroup.Item key={task.id}>
                      <TaskItem task={task} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {filteredTasks.length === 0 && (
        <Alert variant="warning">No tasks found. Add some study tasks to get started!</Alert>
      )}
    </div>
  );
};

export default TaskList; 