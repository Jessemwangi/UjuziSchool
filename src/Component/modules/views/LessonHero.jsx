import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import LessonHeroLayout from'./LessonHeroLayout'

const backgroundImage =
  'https://source.unsplash.com/1400x720/?online';

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
        Reach for Quality
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Enjoy the secret of learning, made like a getaway holiday for you to undestand.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Knowledge and hands on experience
      </Typography>
    </LessonHeroLayout>
  );
}
