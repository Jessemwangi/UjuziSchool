import React from 'react';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PartnerSlider from '../../WhoIsUjuzi/AboutUjuzi/PartnersArea/PartnerSlider';
import { partner_data } from '../../../Data/partners_data';

const { text, brands} = partner_data;

const AdBanner = ({ home_4 }) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className={`${home_4 ? 'online-academy-cta-wrapper' : 'university-cta-wrapper' } edu-cta-banner-area bg-image`}>
            <div className="container">
                <div className="edu-cta-banner">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <h2 className="title">Meet Our <span className="color-primary">Partners</span> </h2>
                                <p>{text}</p>
                                <PartnerSlider items={brands}/>
                                <Link className="edu-btn btn-secondary" to="/champions">
                                View All Partners <i className="icon-4"></i>
                                
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="shape-group">
                        <motion.li className="shape-01 scene"
                            animate={ {
                                x: mouseDirection(25).x,
                                y: mouseDirection(25).y
                            } }
                        >
                            <img src= {require("../../../images/cta/shape-10.png")} alt="shape" />
                        </motion.li>
                        <motion.li className="shape-02 scene"
                            animate={ {
                                x: mouseReverse(25).x,
                                y: mouseReverse(25).y
                            } }
                        >
                            <img src={require("../../../images/cta/shape-09.png")}  alt="shape" />
                        </motion.li>
                        <motion.li className="shape-03 scene"
                            animate={ {
                                x: mouseReverse(25).x,
                                y: mouseReverse(25).y
                            } }
                        >
                            <img src={require("../../../images/cta/shape-08.png")}  alt="shape" />
                        </motion.li>
                        <motion.li className="shape-04 scene"
                            animate={ {
                                x: mouseDirection(25).x,
                                y: mouseDirection(25).y
                            } }
                        >
                            <img src={require("../../../images/about/shape-13.png")}  alt="shape" />
                        </motion.li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdBanner;