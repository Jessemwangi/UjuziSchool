import React from 'react';
import './SingleVideo.scss'
import AppSingleVideo from '../../Component/SingleVideo/AppSingleVideo';
import { useLocation, useParams } from 'react-router-dom';
import LeftCards from '../../Component/modules/components/LeftCards/LeftCards';

const SingleVideo = () => {
    const location = useLocation()
    const id =useParams().id

    const {video} = location.state;
console.log(video,id, 'kjfkdjgkfgjiorjgirejgfdkiofdjg irgigj jnfgojkndgok jdghjoijklmdsg j ijio')
    return (
        <div className='singleVideo'>
            <h2>{video.title}</h2>
            <AppSingleVideo videoUrl={video.url} key={id}/> {/*  //to pass url and the title */}
            <div className="desc">
                <p>{video.desc}</p>
            </div>

            {/* <LeftCards/> */}
        </div>
    );
};

export default SingleVideo;