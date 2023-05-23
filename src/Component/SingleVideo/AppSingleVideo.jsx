import { Container, Grid } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';
import './Single_Video.scss'
import ControlIcons from '../modules/components/ControlIcons';
import Controls from '../modules/components/Controls';


const AppSingleVideo = () => {
    return (
      <Container sx={{ my: 8, display: 'flex', }}>
      <Grid container spacing={5}>
        <Container maxWidth="md" className='singleVideoContainer'>
        <div className='playerDiv'>
          <ReactPlayer width={'100%'} height='50vh' 
          playing={true}
          muted={true}
          controls={true}
          url="https://youtu.be/JKvQTCRLTHY"
          />
        <Controls/>
        </div>
      </Container>
      </Grid>
     
      </Container>
    );
};

export default AppSingleVideo;