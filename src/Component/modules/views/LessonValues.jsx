import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import curvy from '../../../static/assets/productCurvyLines.png'
import p_values1 from '../../../static/assets/productValues1.svg'
import p_values2 from '../../../static/assets/productValues2.svg'
import p_values3 from '../../../static/assets/productValues3.svg'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function LessonValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src={curvy}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
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
                Best of Sciences
              </Typography>
              <Typography variant="h5">
                {
                  'Selected from the latest trands and finest quality from around the world'
                }

                {
                  ', study in an international way, ahead of others.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={p_values2}
            
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5, textAlign:'left' }}>
                Practicals experiences
              </Typography>
              <Typography variant="h5">
                {
                  'build, test and visualize before sitting for that exam… '
                }

                {'your study will not be alike...'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={p_values3}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Exclusive Video tutorials
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access customized video and other materials'}
                {'that you will not find anywhere else.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LessonValues;

