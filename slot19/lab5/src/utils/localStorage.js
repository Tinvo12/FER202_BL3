// Utility functions for safe localStorage operations

const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const safeGetItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage (${key}):`, error);
    // Remove corrupted data
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // Ignore removal errors
    }
    return defaultValue;
  }
};

export const safeSetItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item to localStorage (${key}):`, error);
    return false;
  }
};

export const safeRemoveItem = (key) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error);
    return false;
  }
};

export const clearAllStorage = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Validate and clean localStorage data
export const validateAndCleanStorage = () => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  
  const keys = ['cart', 'favourites', 'auth'];
  
  keys.forEach(key => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        JSON.parse(item); // Test if valid JSON
      }
    } catch (error) {
      console.warn(`Removing corrupted localStorage data for key: ${key}`);
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // Ignore removal errors
      }
    }
  });
};
