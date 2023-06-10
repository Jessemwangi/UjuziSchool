import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import ujLogo from '../../../static/assets/newlog.png';

const rightLink = {
  fontSize: 16,
  color: '#BA68C8',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" sx={{background:' #040535'}}>
        <Toolbar sx={{ justifyContent: 'space-between',overflow:'hidden' }}>
          <Box sx={{ flex: 1 }} >
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
                  <Box
        component="img"
        src={ujLogo}
        alt="Ujuzi Logo"
        sx={{ height: 130, paddingTop:'6px' }}
      />
          </Link>
            </Box>
<Box sx={{ flex: 6, display: 'flex', justifyContent: 'space-around', alignItems:'center' }}>
  <Box sx={{ flex: 4, display: 'flex', justifyContent: 'center', alignItems:'center',gap:'50px' }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/Courses"
            sx={{ fontSize: 16 }}
          >
            {'Courses'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize:16}}
          >
            {'Practicals'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 16 }}
          >
            {'Exams'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/aboutus"
            sx={{ fontSize: 16 }}
          >
            {'About Us'}
          </Link>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/attrib"
            sx={{ fontSize: 16 }}
          >
            {'Sponsors'}
          </Link>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in"
              sx={rightLink}
            >
              {'Sign In'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up"
              sx={{ ...rightLink }}
            >
              {'Sign Up'}
            </Link>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
