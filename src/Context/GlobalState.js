import React, { useContext, useReducer } from "react";

const initialState = {
  tasks: [],
  addTask: false,
  users: [],
};

// Create Context
export const TaskContext = React.createContext();

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.details],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.details.id),
      };

    case "SHOW_ADD_TASK":
      return {
        ...state,
        addTask: !state.addTask,
      };

    case "GET_TASK":
      return {
        ...state,
        tasks: action.tasks,
      };

    case "SET_REMINDER":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return { ...task, reminder: !task.reminder };
          }
          return task;
        }),
      };

    default:
      return state;
  }
};

// Provider
export const TaskProvider = ({ children }) => (
  <TaskContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </TaskContext.Provider>
);

export const useStateValue = () => useContext(TaskContext);
