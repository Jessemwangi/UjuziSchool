import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import about_13 from '../../../images/about/about-13.webp';
import about_15 from '../../../images/about/about-15.webp';
import about_14 from '../../../images/about/about-14.webp';
import about_16 from '../../../images/about/about-16.webp';
import shape_33 from '../../../images/about/shape-33.png';
import shape_25 from '../../../images/about/shape-25.png';
import shape_13 from '../../../images/about/shape-13.png';
import { Link } from '@mui/material';


// MissionItem
function MissionItem({ color, icon, title, text }) {
    return (
        <div className="single-item" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className={`icon color-extra${color}`}><i className={`icon-${icon}`}></i></div>
            <div className="content">
                <h4 className="title">{title}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
}

const AboutUsArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className="edu-section-gap edu-about-area about-style-8">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="about-content">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">About Us</span>
                                <h2 className="title">We empower <span className="color-secondary">Innovators</span> and creators of tomorrow.</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>
                                Ujuzi is a technology company based in Finland. We capitalize on the excellent Finnish model and collaborate with Finnish companies to solve
                                 multifaceted problems and foster socio-economic development between Europe (Finland) and Africa.</p>
                                 <div>
                                 <Link
                  className="edu-btn btn-medium"
                  variant="h6"
                  underline="none"
                  color="inherit"
                  href="/community"
                  sx={{ textAlign: "center", fontSize: 20 }}
                >
                  {"Join our Community 👩🏽‍👩🏽‍👧🏽‍👦🏽"}
                </Link>
                                 </div>
                            </div>
                            
                            <div className="about-mission">
                                <MissionItem color="02" icon="51" title="Our Mission" text="We empower young learners by developing cutting-edge resources, technologies, and platforms that foster the sharing of tech knowledge and practical skills. Our goal is to enable them to lead innovation and drive lasting change across the continent." />
                                <MissionItem color="06" icon="52" title="Our Vision" text="To cultivate a vibrant ecosystem where the youth actively lead in innovation and solution-driven endeavours, empowering the globe's future." />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <div className="row g-5" id="masonry-gallery">
                                <div className="col-6 masonry-item">
                                    <div className="thumbnail thumbnail-1 mb--30" data-sal-delay="50" data-sal="slide-down" data-sal-duration="1000">
                                        <img src={about_13} alt="About Images" />
                                    </div>

                                    <div className="thumbnail thumbnail-4" data-sal-delay="50" data-sal="slide-up" data-sal-duration="1000">
                                        <img src={about_15} alt="About Images" />
                                    </div>
                                </div>
                                <div className="col-6 masonry-item">
                                    <div className="thumbnail thumbnail-2 mb--30" data-sal-delay="50" data-sal="slide-down" data-sal-duration="1000">
                                        <img src={about_14} alt="About Images" />
                                    </div>
                                    <div className="thumbnail thumbnail-3" data-sal-delay="50" data-sal="slide-up" data-sal-duration="1000">
                                        <img src={about_16} alt="About Images" />
                                    </div>
                                </div>
                            </div>
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src={shape_33} alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src={shape_25}  alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src={shape_13}  alt="Shape Images" />
                                </motion.li>
                                <motion.li className="shape-4 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                    animate={ {
                                        x: mouseReverse(40).x,
                                        y: mouseReverse(40).y
                                    } }
                                >
                                    <span></span>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsArea;