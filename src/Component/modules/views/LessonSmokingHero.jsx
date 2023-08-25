import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import ujuzi from '../../../static/assets/logo.png'

export const LessonSmokingHero = () =>{
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid #BA68BE',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
          mt:10,
        }}
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
      <Box
        component="img"
        src={ujuzi}
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
  );
}

