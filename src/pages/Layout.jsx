import React from 'react';
import Main from '../Component/Main/Main';
import AppFooter from '../Component/modules/views/AppFooter';
import AppAppBar from '../Component/modules/views/AppAppBar';

const Layout = () => {
    return (
        <div>
            <AppAppBar />
            {/* <LesseonHero /> */}
            <Main/>   {/* where all will be delivered */}
            <AppFooter />

        </div>
    );
};

export default Layout