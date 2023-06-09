import React, { Fragment } from 'react';
import './AboutUs.scss'
import BreadCrumb from '../../Component/AboutHeader/BreadCrums';
import Testimonial from '../../Component/Testimonials/Testimonial';
import WhoIsUjuzi from '../../Component/WhoIsUjuzi/WhoIsUjuzi';
import VisionMission from '../../Component/modules/views/Vision';
import OurProduct2 from '../../Component/modules/views/OurProduct2';

const AboutUs = () => {
    return (
        <Fragment>
            <div className='aboutus'>

                <BreadCrumb/>
                <VisionMission/>
                <WhoIsUjuzi/>

                <OurProduct2/>
                {/* <Testimonial/> */}
            </div>
        </Fragment>
    );
};

export default AboutUs;