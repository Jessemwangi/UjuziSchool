import React from 'react';
import ContactMeArea from './contact-me-area';
import ContactMeFormArea from './contact-me-form-area';

const WriteUs = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <ContactMeArea/>
                <ContactMeFormArea/>
            </div>
        </div>
    )
}

export default WriteUs;