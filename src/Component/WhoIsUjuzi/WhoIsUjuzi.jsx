import React from 'react';
import './WhoIsUjuzi.scss'
import { Box, Container, Grid } from '@mui/material';
import Typography from '../modules/components/Typography';
import dotted from '../../static/assets/logo.png'

// import dotted from '../../../static/assets/productCTAImageDots.png'

const WhoIsUjuzi = () => {
    return (
        <div className='whoIsUjuzi'>



<Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#B4417B',
              color:'white',
              py: 8,
              px: 3,
            }}
          >
            <Box  sx={{ maxWidth: 400 }}>
              <Typography variant="h2"  marked="center" component="h2" gutterBottom>
              Who we are
              </Typography>
              <Typography variant="h5">
              Ujuzi is a technology company based in Finland. We capitalize on the excellent Finnish
model and collaborate with Finnish companies to solve multifaceted African problems and foster
socio-economic development between Finland and Africa.

              </Typography>

            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: {dotted},
            }}
          />
          <Box
            component="img"
     
            src="https://source.unsplash.com/750x600/?physics?auto=format&fit=crop&w=750"
            alt="ujuzi in action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
    </Container>
            <div className="bottom">
            <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
            <Grid
        sx={{
         
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >

            <Typography variant="h4" component="span" marked={'center'}>
            What we do 💪
        </Typography>
      </Grid>
      {/* <Typography variant="subtitle1" sx={{ my: 6, fontSize:'18px' }}>
      Our products UjuziP, UjuziC, UjuziB, and UjuziIT, solves challenges in STEM education. We bring
this solution because in East Africa, particularly Tanzania, fewer secondary school students are
registering for STEM due to various reasons such as lack of knowledge about the applicability of STEM
in real-life, the failure to connect theoretical concepts learned in STEM subjects like physics with realworld applications, and more focus on theory due to the lack of resources to implement the practical
side of STEM. It leads to a lack of practical understanding, interest, and engagement in STEM education
and a missed opportunity to inspire students to pursue STEM-related careers. Moreover, the teaching
methods do not effectively address the need for hands-on, experiential learning opportunities, hindering
students' ability to apply STEM knowledge in their everyday lives and limiting their potential for future
STEM-related opportunities.
      </Typography> */}
      {/* <Box
        component="img"
        src="/static/themes/onepirate/productBuoy.svg"
        alt="buoy"
        sx={{ width: 60 }}
      /> */}
      </Container>
      </div>
        </div>
    );
};

export default WhoIsUjuzi;