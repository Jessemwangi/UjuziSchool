import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import'./SystemError.scss'

// const primary = purple[500]; 


const SystemError =({errorMessage}) => {
  return (
    <Box className="systemError"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        // backgroundColor: '#9c27b0',
      }}
    >
      <Typography variant="h1" style={{ color: 'black' }}>
        Sorry an Error 
      </Typography>
      <Typography variant="h4" style={{ color: 'red' }}>
       {errorMessage}
      </Typography>
      <div className='buttonControls'>

      <Button sx={{ mt: 3, mb: 2, fontSize: 16,  padding: '10px 30px',width: 'max-content', background:'#040535',}} color='secondary' variant="contained">Back Home</Button>
      <Button sx={{ mt: 3, mb: 2, fontSize: 16,  padding: '10px 30px',width: 'max-content',}} variant="contained" color='secondary' onClick={()=>{
        window.location.reload(true)
      }}>Try Refresh</Button>
      </div>
    </Box>
  );
}

export default SystemError;