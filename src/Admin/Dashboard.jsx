import React from 'react';
import AdminMain from './AdminMain';
import { useUser } from '../hooks/UserContext';
import { Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


const Dashboard = () => {
    const user = useUser();

console.log(user)
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

    return (
      <HelmetProvider>
      <React.Fragment>
 
        <AdminMain/>
        {/* <Footer /> */}
      
      </React.Fragment>
   </HelmetProvider>
    );
};

export default Dashboard;