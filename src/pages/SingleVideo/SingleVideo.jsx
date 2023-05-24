import  React from 'react';
import './SingleVideo.scss'
import AppSingleVideo from '../../Component/SingleVideo/AppSingleVideo';
import withRoot from '../../Component/modules/withRoot';
import { Grid, Container } from '@mui/material';
import Typography from '../../Component/modules/components/Typography';
import VideoLeft from '../../Component/modules/views/VideoLeft/VideoLeft';

const SingleVideo = (props ={title:'jesse'}) => {
    console.log(props)
    return (
        <React.Fragment>
        {/* <AppAppBar /> */}
        <Container className='singleVideo'>
          <Grid className='left'>
          <Grid sx={{ mt: 7, mb: 12 }}>
            <Typography variant="h3" gutterBottom marked="center" align="center" sx={{color:'#BA68C8'}}>
              Video
            </Typography>
            <div className='header__section'>
            <p>{props.title}</p>
        </div>
<AppSingleVideo/>
          </Grid>
          </Grid>
          
          <Grid className='right'>
          <Typography variant="h3" gutterBottom marked="center" align="center" sx={{color:'#BA68C8'}}>
              Related Video
            </Typography>
            <VideoLeft/>
          </Grid>
        </Container>
        {/* <AppFooter /> */}
      </React.Fragment>



       
  
      
    );
};

export default withRoot(SingleVideo);