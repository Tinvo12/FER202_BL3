import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  selectedDay: 'all'
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        day: action.payload.day,
        completed: false
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    resetTasks: (state) => {
      state.tasks = [];
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    }
  }
});

export const { addTask, toggleTask, resetTasks, setSelectedDay } = taskSlice.actions;
export default taskSlice.reducer; 