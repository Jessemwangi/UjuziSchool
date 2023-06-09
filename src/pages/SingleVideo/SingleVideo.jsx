import React from 'react';
import './SingleVideo.scss'
import AppSingleVideo from '../../Component/SingleVideo/AppSingleVideo';
import { useLocation, useParams } from 'react-router-dom';
import LeftCards from '../../Component/modules/components/LeftCards/LeftCards';
import Typography from '../../Component/modules/components/Typography';
import { Box } from '@mui/material';

const SingleVideo = () => {
    const location = useLocation()
    const id =useParams().id

    const {video} = location.state;
    return (
        <div className='singleVideo'>
                  <Box 
        sx={{
          textAlign:'center',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
          mt:3,
        }}
      >
        <Typography variant="h4" component="span" marked={'center'}>
        {video.title}
        </Typography>
      </Box>
            <AppSingleVideo videoUrl={video.url} key={id}/> {/*  //to pass url and the title */}
            <div className="desc">
                <p>{video.desc}</p>
            </div>

            {/* <LeftCards/> */}
        </div>
    );
};

export default SingleVideo;