import React, { createContext, useContext, useReducer } from 'react';

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }]
      };

    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };

    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: []
      };

    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    toasts: []
  });

  const addToast = (message, type = 'info') => {
    dispatch({
      type: 'ADD_TOAST',
      payload: { message, type }
    });

    // Auto remove toast after 3 seconds
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOAST',
        payload: Date.now()
      });
    }, 3000);
  };

  const removeToast = (id) => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: id
    });
  };

  const clearToasts = () => {
    dispatch({
      type: 'CLEAR_TOASTS'
    });
  };

  return (
    <ToastContext.Provider value={{
      toasts: state.toasts,
      addToast,
      removeToast,
      clearToasts
    }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
