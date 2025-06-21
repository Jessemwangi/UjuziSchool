import React, { useState } from 'react';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import './VideoSlider.scss'

const VideoSlider = () => {
    const [currentSlide, setCurrentSlide]= useState(0)

const images = [
    'https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg', // school
    'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg', // library
    'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg', // lesson
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg', // coding
    'https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg', // physics
    'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg', // math
];

    const prevSlide = () =>{
setCurrentSlide(currentSlide === 0 ? images.length : (prev) => prev - 1 )
    }
    const nextSlide = () =>{
      setCurrentSlide(currentSlide === images.length ? 0 : (prev) => prev + 1 )
    }
    return (
        <div className='videoSlider'>
                  <div className="container" style={{ width:`${images.length * 100}vw`, transform: `translateX(-${currentSlide * 100}vw)` }}>
        <img src={images[0]} alt="" />
        <img src={images[1]} alt="" />
        <img src={images[2]} alt="" />
        <img src={images[3]} alt="" />
        <img src={images[4]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ArrowBackIosIcon  />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </div>
      </div>
        </div>
    );
};

export default VideoSlider;