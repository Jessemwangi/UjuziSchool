import React from 'react';
import InstructionsMasonryArea from './Instructions-masonry-area';
import InstructionsBanner from './Instructions-banner';

const Instructions = () => {
    return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
            <InstructionsMasonryArea/>
            <InstructionsBanner/>
            </div>
            </div>
    );
};

export default Instructions;