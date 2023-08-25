import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSecureUserUid, secureUserUid } from '../UtilitiesFunctions/secureUserData';

// Create a context for the user information
const UserContext = createContext();

// Create a provider component for the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user information is available in session storage
  useEffect(() => {
     
    const storedUser = async () => {
      const sesUser = await getSecureUserUid()
      
     
      if (sesUser) {
        const user = await {...sesUser?.user,jwt:sesUser?.jwt}
        setUser(user);
      }
    }
    storedUser()
  }, []);

  // Function to update the user information in both the context and session storage
  const updateUser = async (newUser) => {
    
    await secureUserUid(newUser)
    const useData = await  getSecureUserUid()
    setUser(useData);
    // sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);
