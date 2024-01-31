import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';
import dotted from '../../../static/assets/productCTAImageDots.png'

export const LessonCTA =() =>{
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" gutterBottom>
                Become a Partner
              </Typography>
              <Typography variant="h5">
              Join us in crafting a brighter future for our youth. Together, let's change the world through education, youth empowerment, and innovation.
Join us in crafting a brighter future for our youth.
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
              />
    <Button
      type="submit"
      color="primary"
      variant="contained"
      sx={{
        width: '100%',
        backgroundColor: '#040535',
        borderRadius:'6px',
        '&:hover': {
          backgroundColor: '#9c27b0', 
        },
        fontSize: '16px', 
      }}
    >
      Get Updated With Goodies!
    </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: {dotted},
            }}
          />
          <Box
            component="img"
     
            src="https://source.unsplash.com/750x600/?library?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will get back to you as soon as possible, mostly within 24 hours."
      />
    </Container>
  );
}

