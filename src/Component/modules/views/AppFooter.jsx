import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import fb from '../../../static/assets/fb.svg'
import { NavLink } from 'react-router-dom';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        Ujuzi Solution
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {

  height: 48,
  display: 'flex',
  justifyContent:'flex-start',
  alignItems: 'center',
  // padding:'0 2rem',
  // border:'solid 1px white',
  // backgroundColor: '#23344',
  transition:'0.4s ease all',
  mr: 1,
  '&:hover': {
    transition:'0.4s ease all',
    transform: 'scale(1.1)',
    opacity:'0.7',
    // justifyContent:'center',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
          <Typography variant="h6" marked="left" gutterBottom>
             Stay in Touch !!
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 130  }}
            >

              <Grid item sx={{ display: 'flex',flexDirection:'column',  paddingTop:'6px' }}>
                <Box component="a" href="/" sx={iconStyle}>
                  <img
                    src={fb}
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="/" sx={iconStyle}>
                  <img
                    src="/static/themes/onepirate/appFooterTwitter.png"
                    alt="Twitter"
                  />
                </Box>
              <Grid item>
                <Copyright />
              </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/terms">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/privacy/">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={3}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={4} md={4} sx={{alignItem:'right'}}>
            <Typography variant="h6" marked="left" gutterBottom>
              Browse all our services
            </Typography>
<Grid sx={{display:'flex', flexDirection:'column'}}>
<Link>Get started with sciences</Link>
<Link>Get started with Nature</Link>
<Link>Get started with Mathematics</Link>
<Link>Be energized with online Exams</Link>
</Grid>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'All right reserve under '}
              <Link href="/terms" rel="Terms" title="Terms">
                Terms
              </Link>
              {' and '}
              <Link href="/privacy" rel="Private" title="Privacy">
                Privacy
              </Link>
              {' Copright '}
              <Link
                href="/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                2023 BC
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
