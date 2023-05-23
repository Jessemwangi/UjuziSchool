import  React from 'react';
import './SingleVideo.scss'
import AppSingleVideo from '../../Component/SingleVideo/AppSingleVideo';
import withRoot from '../../Component/modules/withRoot';
import { Grid, Container } from '@mui/material';
import Typography from '../../Component/modules/components/Typography';

const SingleVideo = (props ={title:'jesse'}) => {
    console.log(props)
    return (
        <React.Fragment>
        {/* <AppAppBar /> */}
        <Container>
          <Grid sx={{ mt: 7, mb: 12 }}>
            <Typography variant="h3" gutterBottom marked="center" align="center" sx={{color:'#BA68C8'}}>
              Video
            </Typography>
            <div className='header__section'>
            <p>{props.title}</p>
        </div>
<AppSingleVideo/>
          </Grid>
        </Container>
        {/* <AppFooter /> */}
      </React.Fragment>



       
  
      
    );
};

export default withRoot(SingleVideo);