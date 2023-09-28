import React, { useEffect, useState } from 'react';
import Main from './Main/Main';
import AppFooter from '../Component/modules/views/AppFooter';
import AppAppBar from '../Component/modules/views/AppAppBar';
// import { useGetUserInfo } from '../hooks/useFetch';
import '../index.scss'
import { getSecureUserUid, userData } from '../UtilitiesFunctions/secureUserData';
import ScrollToTop from '../layout/scroll-to-top';
import { ToastContainer } from 'react-toastify';
import { MouseMoveProvider } from '../Component/contexts/mouse-move-context';
import { useLocation } from 'react-router-dom';
import sal from 'sal.js';
if (typeof window !== 'undefined') {
    require( 'bootstrap/dist/js/bootstrap' );
  }
const Layout = () => {
    const location = useLocation();
    useEffect( () => {
        sal( { threshold: 0.1, once: true } );
    }, [location.pathname] );

    useEffect( () => {
        sal();
    }, [] );
    return (
        <div>
              <MouseMoveProvider>

            
            <AppAppBar />
            {/* <LesseonHero /> */}
            <Main/>   {/* where all will be delivered */}
            <AppFooter />
            <ScrollToTop />
            <ToastContainer />
            </MouseMoveProvider>
        </div>
    );
};

export default Layout