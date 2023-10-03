import React from 'react';
import WeProvide from './WeProvide';
import WhyChooseUs2 from './WhyChooseUs2';
import HowToJoin from './HowToJoin';
import { Link } from 'react-router-dom';

const HowToBeMember = () => {
    return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
        <WeProvide/>
        <WhyChooseUs2/>
        <HowToJoin/>
        <div className="course-view-all" style={{marginBottom:'50px'}} data-sal-delay="150" data-sal="slide-up" data-sal-duration="1200">
                            <Link href="/sign-up" className="edu-btn">
                                Join Our Community <i className="icon-4"></i>
                            </Link>
                        </div>
        </div>
        </div>
    );
};

export default HowToBeMember;