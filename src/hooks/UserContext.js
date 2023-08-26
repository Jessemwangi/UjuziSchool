import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSecureUserUid, secureUserUid } from '../UtilitiesFunctions/secureUserData';

// Create a context for the user information
const UserContext = createContext();

// Create a provider component for the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ctxLoading, setCtxLoading] = useState(true)

  // Check if user information is available in session storage
  useEffect(() => {
     
    const storedUser = async () => {
      setCtxLoading(true)
      localStorage.clear()
      const user = await getSecureUserUid()

      if (user) {
        setUser(user);
      }
      setCtxLoading(false)
    }
    storedUser()
  }, []);

  // Function to update the user information in both the context and session storage
  const updateUser = async (newUser) => {
    setCtxLoading(true)
    await secureUserUid(newUser)
    const useData = await  getSecureUserUid()
    setUser(useData);
    // sessionStorage.setItem('user', JSON.stringify(newUser));
    setCtxLoading(false)
  };

  return (
    <UserContext.Provider value={{ user, updateUser,ctxLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);
