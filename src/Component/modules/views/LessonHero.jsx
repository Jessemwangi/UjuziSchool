import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import LessonHeroLayout from './LessonHeroLayout';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

const backgroundImage =
  'https://res.cloudinary.com/dk4ruyonq/image/upload/v1732387355/bannermain_bgepcu.png';

export default function LessonHero() {
  return (
    <LessonHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      
      {/* Main Heading */}
      <Typography 
        color="inherit" 
        align="center" 
        variant="h2" 
        marked="center"
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        UJUZI
      </Typography>
      
      {/* Subtitle */}
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ 
          mb: 6, 
          maxWidth: '800px', 
          mx: 'auto',
          lineHeight: 1.4,
          fontWeight: 300
        }}
      >
        A Finnish company specializing in scientific research, innovation and development
      </Typography>

      {/* CTA Buttons Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}
      >
        {/* Desktop: Side by side, Mobile: Stacked */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '700px'
          }}
        >
          {/* StemEX Section */}
          <div style={{ textAlign: 'center' }}>
            <Typography
              color="inherit"
              align="center"
              variant="h6"
              sx={{ 
                mb: 2, 
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.3rem' }
              }}  
            >
              Discover our innovative STEM platform
            </Typography>
            <Button
              className="edu-btn btn-medium"
              variant="contained"
              component="a"
              href="https://learn.ujuzi.io/"
              sx={{
                minWidth: { xs: 240, sm: 260 },
                height: 48,
                backgroundColor: '#f36622',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(243, 102, 34, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#d4551b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(243, 102, 34, 0.4)',
                },
              }}
            >
              <RocketLaunchRoundedIcon /> 
              {' '}Explore StemEX
            </Button>
          </div>

          {/* AfroCom Section */}
          <div style={{ textAlign: 'center' }}>
            <Typography
              color="inherit"
              align="center"
              variant="h6"
              sx={{ 
                mb: 2, 
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.3rem' }
              }}
            >
              join our Afro-Community Platform
            </Typography>
            <Button
              className="edu-btn btn-medium"
              variant="contained"
              component="a"
              href="https://https://www.afro-com.com/" target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: { xs: 240, sm: 260 },
                height: 48,
                backgroundColor: '#0b2f81',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(11, 47, 129, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#0a276f',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(11, 47, 129, 0.4)',
                },
              }}
            >
              <GroupsRoundedIcon /> 
             {' '} Explore AfroCom
            </Button>
          </div>
        </div>
      </div>

      {/* Quote */}
      <Typography 
        variant="body1" 
        color="inherit" 
        sx={{ 
          fontStyle: 'italic',
          fontSize: '1.2rem',
          opacity: 0.9,
          maxWidth: '600px',
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        "What the hand touches, the mind will remember"
      </Typography>
    </LessonHeroLayout>
  );
}