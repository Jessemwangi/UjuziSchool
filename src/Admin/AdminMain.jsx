import { Container, Grid } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminMain = () => {

    return (
        <Container className='adminMain' sx={{paddingTop:'3rem'}}>
<Outlet/>         
        </Container>
    );
};

export default AdminMain;