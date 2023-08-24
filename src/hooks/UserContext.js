import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the user information
const UserContext = createContext();

// Create a provider component for the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user information is available in session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to update the user information in both the context and session storage
  const updateUser = (newUser) => {
    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);
