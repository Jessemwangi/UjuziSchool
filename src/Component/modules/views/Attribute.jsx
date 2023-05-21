import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import withRoot from '../withRoot';

import curvy from '../../../static/assets/productCurvyLines.png'
import p_values1 from '../../../static/assets/productValues1.svg'
import p_values2 from '../../../static/assets/productValues2.svg'
import p_values3 from '../../../static/assets/productValues3.svg'
import unsplash from '../../../static/images/Unsplash_Logo_Full.png'
import youtube from '../../../static/images/YouTube_Logo_(2013-2017).svg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const mt={
    marginTop:'3rem'
}

const Attribute = () => {
    return (
 <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >

      <Container sx={{ mt: 15, mb: 30, display: 'flex',  flexDirection:'column', position: 'relative' }}>
       
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          We would like to Attribute the following:-
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={p_values1}
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                FaceBook SVG
              </Typography>
              <Typography variant="h5">
<p>By Facebook Inc. - Investor Relations webpage of Facebook Inc., Annual Report 2017, Public Domain, https://commons.wikimedia.org/w/index.php?curid=70561573</p>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={unsplash}
            
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, textAlign:'left' }}>
                UnSplash Images
              </Typography>
              <Typography variant="h5">
                {
                  'The internet’s source for visuals.'
                  
                }

                {'Powered by creators everywhere.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={youtube}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               YouTube
              </Typography>
              <Typography variant="h5">
              {'By YouTube - https://www.youtube.com/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=17740490'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{mt:10, position:'relative'}}>
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', transform: 'scaleX(-1)', position: 'absolute', top: -200,left:-100 }}
        />
          <Grid item xs={12} md={4}>
            <Box sx={item  }>
              <Box
                component="img"
                src={p_values1}
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                FaceBook SVG
              </Typography>
              <Typography variant="h5">
<p>By Facebook Inc. - Investor Relations webpage of Facebook Inc., Annual Report 2017, Public Domain, https://commons.wikimedia.org/w/index.php?curid=70561573</p>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={unsplash}
            
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, textAlign:'left' }}>
                UnSplash Images
              </Typography>
              <Typography variant="h5">
                {
                  'The internet’s source for visuals.'
                  
                }

                {'Powered by creators everywhere.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={youtube}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
               YouTube
              </Typography>
              <Typography variant="h5">
              {'By YouTube - https://www.youtube.com/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=17740490'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    );
};

export default withRoot(Attribute);