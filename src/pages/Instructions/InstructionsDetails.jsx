import React from 'react';
import InstructionsBanner from './Instructions-banner';
import InstructionsDetailsArea from './Instructions-details-area';
import { useParams } from 'react-router-dom';

const InstructionsDetails = () => {
    const { id } = useParams();
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