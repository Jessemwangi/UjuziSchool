import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {

    return (
        <Container className='adminMain' sx={{}}>
             <Outlet/>
        </Container>
    );
};

export default AdminMain;