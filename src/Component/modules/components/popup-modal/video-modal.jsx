import React from 'react';
import ModalVideo from 'react-modal-video';

const VideoModal = ({isVideoOpen,setIsVideoOpen,videoId = "_xUg1Cm2oeU"}) => {
    return (
        <ModalVideo 
            channel='youtube' 
            autoplay isOpen={isVideoOpen} 
            videoId={videoId}
            onClose={() => setIsVideoOpen(false)} 
        />
    )
}

export default VideoModal;