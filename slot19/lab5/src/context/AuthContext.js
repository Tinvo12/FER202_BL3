import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '../utils/localStorage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = safeGetItem('auth', { isAuthenticated: false, user: null });
    if (savedAuth && savedAuth.isAuthenticated && savedAuth.user) {
      dispatch({ type: 'LOGIN', payload: savedAuth.user });
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    safeSetItem('auth', state);
  }, [state]);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const register = (userData) => {
    dispatch({ type: 'REGISTER', payload: userData });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
