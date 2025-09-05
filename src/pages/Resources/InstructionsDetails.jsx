import React from 'react';
import InstructionsBanner from './Instructions-banner';
import InstructionsDetailsArea from './Instructions-details-area';


const InstructionsDetails = () => {

    return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
            <InstructionsDetailsArea/>
            <InstructionsBanner/>
            </div>
            </div>
    );
};

export default InstructionsDetails;