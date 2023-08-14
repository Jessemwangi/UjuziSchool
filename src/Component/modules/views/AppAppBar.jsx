import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ujLogo from '../../../static/assets/logo.png';
import './AppAppBar.scss'; // Import the custom CSS


const rightLink = {
  fontSize: 16,
  color: '#BA68C8',
  ml: 3,
};

const mobiLink = {
  display: 'block',
  padding: '16px',
  textAlign:'center',
  width:'100%',
  color: '#ffffff',
  textDecoration: 'none', // Use camelCase notation for text-decoration
  fontSize: '16px', // Use camelCase notation for font-size
  transition: 'background-color 0.2s ease',
  transitionDelay: '0.3s', // Use camelCase notation for transition-delay
  backgroundColor: '#040535', // Use camelCase notation for background-color

  '&:hover': {
    backgroundColor: '#502a57',
    borderRadius: '4px',
  },

  '&:active': {
    backgroundColor: 'white',
    color:'#BA68C8'
  },
};

function AppAppBar() {

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event.key === 'Tab' || event.key === 'Shift'))
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ background: '#040535' }}>
        <Toolbar sx={{ justifyContent: 'space-between', overflow: 'hidden' }}>
          <Box sx={{ flex: 1 }}>
            <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 24 }}>
              <Box component="img" src={ujLogo} alt="Ujuzi Logo" sx={{ height: 130, paddingTop: '6px' }} />
              <p style={{color:"white"}}>powerful msg</p>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: 6, justifyContent: 'space-around', alignItems: 'center' }}>
            <Link variant="h6" underline="none" color="inherit" href="/Courses" sx={{ fontSize: 16 }}>
              {'Courses'}
            </Link>
            <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 16 }}>
              {'Practicals'}
            </Link>
            <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 16 }}>
              {'Exams'}
            </Link>
            <Link variant="h6" underline="none" color="inherit" href="/aboutus" sx={{ fontSize: 16 }}>
              {'About Us'}
            </Link>
            <Link variant="h6" underline="none" color="inherit" href="/attrib" sx={{ fontSize: 16 }}>
              {'Sponsors'}
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link color="inherit" variant="h6" underline="none" href="/sign-in" sx={rightLink}>
              {'Sign In'}
            </Link>
            <Link variant="h6" underline="none" href="/sign-up" sx={{ ...rightLink }}>
              {'Sign Up'}
            </Link>
          </Box>
          {/* Hamburger Menu Icon for Smaller Screens */}
          <Box className="hamburger-menu">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{fontSize:'40px'}}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* Drawer for Hamburger Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{   background:'transparent',   transition: 'transform 0.3s ease-in-out', // Add the transition here
    transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)'}}
      >
        <Box sx={{width:250, paddingTop:'5rem', display:'flex', flexDirection:'column', gap:'2rem', alignItems:'center',}}>
          <Link variant="h6" underline="none" href="/Courses" sx={mobiLink}>
            {'Courses'}
          </Link>
          <Link variant="h6" underline="none"  href="/" sx={mobiLink}>
            {'Practicals'}
          </Link>
          <Link variant="h6" underline="none"  href="/" sx={mobiLink}>
            {'Exams'}
          </Link>
          <Link variant="h6" underline="none" href="/aboutus" sx={mobiLink}>
            {'About Us'}
          </Link>
          <Link variant="h6" underline="none"  href="/attrib" sx={mobiLink}>
            {'Sponsors'}
          </Link>
          <Link color="inherit" variant="h6" underline="none" href="/sign-in" sx={rightLink} className="drawerLink">
            {'Sign In'}
          </Link>
          <Link variant="h6" underline="none" href="/sign-up" sx={{ ...rightLink }} className="drawerLink">
            {'Sign Up'}
          </Link>
        </Box>
      </Drawer>
    </div>
  );
}

export default AppAppBar;
