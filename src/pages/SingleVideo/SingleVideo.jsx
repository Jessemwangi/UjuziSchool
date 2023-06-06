import React from 'react';
import './SingleVideo.scss'
import AppSingleVideo from '../../Component/SingleVideo/AppSingleVideo';
import { useParams } from 'react-router-dom';

const SingleVideo = () => {
    const id =useParams().id
    return (
        <div className='singleVideo'>
            <AppSingleVideo/> {/*  //to pass url and the title */}
        </div>
    );
};

export default SingleVideo;