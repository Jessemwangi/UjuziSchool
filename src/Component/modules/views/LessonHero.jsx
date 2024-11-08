import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import LessonHeroLayout from'./LessonHeroLayout'

const backgroundImage =
  'https://res.cloudinary.com/dk4ruyonq/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1731078002/herobanner_e6hrso.png';

export default function LessonHero() {
  return (
    <LessonHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',

      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
      Experiential Learning, innovation and Impact
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Empowering young minds to explore STEM through experiential learning, igniting innovation for a brighter tomorrow.
      </Typography>
      <Button
       className='edu-btn btn-medium'
        variant="contained"
        
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 250 }}
      >
        Register 📝
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        What the hand touches the mind will remember.
      </Typography>
    </LessonHeroLayout>
  );
}
