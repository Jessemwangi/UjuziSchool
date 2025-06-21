import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { keyframes } from '@emotion/react';

export const LessonSmokingHero = () =>{
  const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5%);
  }
`;
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
        src={'https://res.cloudinary.com/dk4ruyonq/image/upload/v1732388570/equipt1_siczrn.png'}
        alt="Ujuzi"
        sx={{ width: 80, borderRadius:'9px', border: 'solid 4px #040535', boxShadow:'2px 3px 7px #040535', animation: `${bounce} 1s infinite` }}
      />
    </Container>
  );
}

