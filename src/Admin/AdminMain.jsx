import { Container, Grid } from '@mui/material';
import React from 'react';
import FilterBar from './Componets/FilterBar';
import VideoList from './Componets/VideoList';

const AdminMain = () => {

    return (
        <Container className='adminMain' sx={{}}>
             <main className="main-content">
        <Container maxWidth="lg">
          <FilterBar />

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
          <VideoList/>
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Other content or widgets */}
            </Grid>
          </Grid>
        </Container>
      </main>
            
        </Container>
    );
};

export default AdminMain;