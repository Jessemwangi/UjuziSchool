import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../Component/contexts/mouse-move-context';

const lists = [
    'Experitial Learning',
    'Innovation',
    'instruction Support',
    'Whats beyond class',
    'application of STEM'
];

const WeProvide = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="section-gap-large edu-about-area about-style-7">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-5">
                        <div className="about-content">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">As Ujuzi member</span>
                                <h2 className="title">Did you know<span className="color-secondary"> STEMEX learning</span> should be innovative.</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>“Ujuzi is a platform designed to bring joy to your learning experience as we simplify the implementation of STEM in the modern world. Our mission is to provide you with a comprehensive understanding of your school curriculum through practical, guided instructions. We encourage innovation by challenging you to create your own custom equipment. But we don’t stop there. We urge you to delve deeper, exploring the potential applications of your creations and the positive impact they could have on both your local community and the world at large.”</p>
                            </div>
                            <ul className="features-list" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                {lists.map((l,i) => <li key={i}>{l}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="about-image-gallery">
                            <img className="main-img-1" src={require('../../images/about/about-11.webp')} alt="About Image" />
                            <img className="main-img-2"src={require('../../images/about/about-12.webp')} data-sal-delay="150" data-sal="slide-down" data-sal-duration="800" alt="About Image" />
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src={require('../../images/about/shape-38.png')} alt="Shape" />
                                </motion.li>
                                <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src={require('../../images/about/shape-37.png')} alt="Shape" />
                                </motion.li>
                                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src={require('../../images/about/shape-04.png')} alt="Shape" />
                                </motion.li>
                                <li className="shape-4 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                    <img src={require('../../images/about/shape-02.png')} alt="Shape" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="shape-group">
                <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200"></li>
            </ul>
        </div>
    )
}

export default WeProvide;