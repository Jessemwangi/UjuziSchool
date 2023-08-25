import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {
    return (
        <div>
             <Outlet/>
        </div>
    );
};

export default AdminMain;