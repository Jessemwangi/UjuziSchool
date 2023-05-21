import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import howit1 from '../../../static/assets/productHowItWorks1.svg'
import howit2 from '../../../static/assets/productHowItWorks2.svg'
import howit3 from '../../../static/assets/productHowItWorks3.svg'
import curvy from '../../../static/assets/productCurvyLines.png'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function LessonHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How it works,  Let's learn together,Make sure to check the facts, and share,  Let's learn together
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={howit1}
              
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                Let's learn together,Make sure to check the facts, and share
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={howit2}
                  // ../../../static/assets/productHowItWorks2.svg
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                Let's learn together,Make sure to check the facts, and share,  Let's learn together
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={howit3}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Let's learn together,Make sure to check the facts, and share,  Let's learn together
                  {'Your studies will no longer be alike.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/sign-up"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default LessonHowItWorks;
