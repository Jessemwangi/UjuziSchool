import React, { Fragment } from 'react';
import './AboutUs.scss'
import BreadCrumb from '../../Component/AboutHeader/BreadCrums';
import Testimonial from '../../Component/Testimonials/Testimonial';
import WhoIsUjuzi from '../../Component/WhoIsUjuzi/WhoIsUjuzi';
import VisionMission from '../../Component/modules/views/Vision';

const AboutUs = () => {
    return (
        <Fragment>
            <div className='aboutus'>

                <BreadCrumb/>
                <VisionMission/>
                <WhoIsUjuzi/>
                <Testimonial/>
            </div>
        </Fragment>
    );
};

export default AboutUs;