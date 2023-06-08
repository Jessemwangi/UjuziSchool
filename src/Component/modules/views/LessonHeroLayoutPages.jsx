import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import arrowDown from '../../../static/assets/productHeroArrowDown.png'
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import Typography from '../components/Typography';

const PagesBreadCrum = styled('section')(({ theme }) => ({
  color: theme.palette.common.white,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '30vh',
    minHeight: 300,
    maxHeight: 400,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

function LessonHeroPages(props) {
  const { sxBackground, children } = props;

  return (
    <PagesBreadCrum>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        {/* <img
          src={arrowDown}
          alt="wonder"
          width="20"
          height="20"
        /> */}
       < WbIncandescentOutlinedIcon/>
             <Typography variant="h4" marked="center" align="center" component="h2" sx={{mt:2}}>
        About Ujuzi
      </Typography>
        {children}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box
          component="img"
          src={arrowDown}
          height="16"
          width="12"
          alt="arrow down"
          sx={{ position: 'absolute', bottom: 32 }}
        />
      </Container>
    </PagesBreadCrum>
  );
}

LessonHeroPages.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default LessonHeroPages;
