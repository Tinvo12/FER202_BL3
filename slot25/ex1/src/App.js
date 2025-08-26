import React from 'react';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { store } from './store/store';
import AddTaskForm from './components/AddTaskForm';
import WeekFilter from './components/WeekFilter';
import TaskList from './components/TaskList';
import ResetButton from './components/ResetButton';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Container className="py-4">
        <header className="text-center mb-4">
          <h1 className="display-5">📚 Study Planner App</h1>
          <p className="text-muted">Organize your weekly study tasks with ease</p>
        </header>

        <Row className="g-4">
          <Col xs={12} md={6} lg={5}>
            <AddTaskForm />
            <WeekFilter />
            <ResetButton />
          </Col>
          <Col xs={12} md={6} lg={7}>
            <TaskList />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
