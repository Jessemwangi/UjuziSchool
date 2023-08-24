import React, { useEffect, useState } from 'react';
import Main from './Main/Main';
import AppFooter from '../Component/modules/views/AppFooter';
import AppAppBar from '../Component/modules/views/AppAppBar';
// import { useGetUserInfo } from '../hooks/useFetch';
import { getSecureUserUid, userData } from '../UtilitiesFunctions/secureUserData';

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