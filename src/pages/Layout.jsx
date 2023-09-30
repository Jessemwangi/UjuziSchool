import React, { useEffect, useState } from 'react';
import Main from './Main/Main';
import AppAppBar from '../Component/modules/views/AppAppBar';
// import { useGetUserInfo } from '../hooks/useFetch';
import '../index.scss'
import ScrollToTop from '../layout/scroll-to-top';
import { ToastContainer } from 'react-toastify';
import { MouseMoveProvider } from '../Component/contexts/mouse-move-context';
import { useLocation } from 'react-router-dom';
import sal from 'sal.js';
import Footer from '../layout/footers/footer';
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
            <Footer style_2={"footer-dark bg-image footer-style-2"} /> 
            {/* <AppFooter /> */}
            <ScrollToTop />
            <ToastContainer />
            </MouseMoveProvider>
        </div>
    );
};

export default Layout