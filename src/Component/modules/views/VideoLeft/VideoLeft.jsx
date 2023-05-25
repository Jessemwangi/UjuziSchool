import React from 'react';
import LeftCards from '../../components/LeftCards/LeftCards';


const VideoLeft = () => {

 const RenderLeftCards = () =>{
let display =[]
    for (let index = 0; index < 7; index++) {
       
        display.push(<LeftCards/>)
    }
    return display;
 }

    return (
        <>
            <RenderLeftCards/>
        </>
    );
};

export default VideoLeft;