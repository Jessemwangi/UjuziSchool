import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import'./SystemError.scss'
import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336


const SystemError =({errorMessage}) => {
  return (
    <Box className="systemError"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        Sorry an Error 
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
       {errorMessage}
      </Typography>
      <div className='buttonControls'>

      <Button variant="contained">Back Home</Button>
      <Button variant="contained" onClick={()=>{
        window.location.reload(true)
      }}>Try Refresh</Button>
      </div>
    </Box>
  );
}

export default SystemError;