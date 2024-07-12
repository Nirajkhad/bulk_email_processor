// src/config/localStorageHelper.js

// Save data to localStorage
const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  // Retrieve data from localStorage
  const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  // Remove data from localStorage
  const removeData = (key) => {
    localStorage.removeItem(key);
  };
  
  export { saveData, getData, removeData };
  