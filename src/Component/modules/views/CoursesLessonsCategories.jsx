import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { useNavigate } from 'react-router-dom';

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const images = [
  {
    catId:1,
    url: ' https://source.unsplash.com/1000x1000/?physics?auto=format&fit=crop&w=400',
    title: 'Physics',
    width: '40%',
  },
  {
    catId:2,
    url:' https://source.unsplash.com/1000x1000/?math?auto=format&fit=crop&w=400',
    title: 'Math',
    width: '20%',
  },
  { catId:3,
    url: ' https://source.unsplash.com/1000x1000/?engineering?auto=format&fit=crop&w=400',
    title: 'Engineering',
    width: '40%',
  },
  { catId:4,
    url: ' https://source.unsplash.com/1000x1000/?social?auto=format&fit=crop&w=400',
    title: 'Social',
    width: '38%',
  },
  {
    catId:5,
    url: ' https://source.unsplash.com/1000x1000/?Business?auto=format&fit=crop&w=400',
    title: 'Business',
    width: '38%',
  },
  { catId:6,
    url: ' https://source.unsplash.com/1000x1000/?ict?auto=format&fit=crop&w=400',
    title: 'ICT',
    width: '24%',
  },
  { catId:7,
    url: ' https://source.unsplash.com/1000x1000/?biology?auto=format&fit=crop&w=400',
    title: 'Biology',
    width: '40%',
  },
  { catId:8,
    url: ' https://source.unsplash.com/1000x1000/?languages?auto=format&fit=crop&w=400',
    title: 'Languages',
    width: '20%',
  },
  { catId:9,
    url: ' https://source.unsplash.com/1000x1000/?reading?auto=format&fit=crop&w=400',
    title: 'Reading',
    width: '40%',
  },
];

 const CoursesLessonsCategories = () => {
const navigate = useNavigate()

  const viewCategory = (id) =>{
    navigate(`/category/${id}`)
  }

  return (
    <div style={{mb: 4, width:'100%', background:'black' }}>

      <div  style={{ display: 'flex', flexWrap: 'wrap', width:'100%' }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
              border:'solid white 2px'
            }}
            onClick={() => viewCategory(image.catId)}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'common.white',
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
                
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </div>
    </div>
  );
}

export default CoursesLessonsCategories;