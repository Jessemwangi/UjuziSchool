import React, { useState } from 'react';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import './VideoSlider.scss'

const VideoSlider = () => {
    const [currentSlide, setCurrentSlide]= useState(0)

    const images = [
        'https://source.unsplash.com/1000x1000/?shoes',
        'https://source.unsplash.com/1000x1000/?dress',
        'https://source.unsplash.com/1000x1000/?bags',
        'https://source.unsplash.com/1000x1000/?shirts',
        'https://source.unsplash.com/1000x1000/?newarrivals',
        'https://source.unsplash.com/1000x1000/?babycloths',
    ]

    const prevSlide = () =>{
      console.log(currentSlide)
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