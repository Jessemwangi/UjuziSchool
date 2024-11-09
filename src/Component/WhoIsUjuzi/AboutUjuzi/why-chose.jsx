import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import { whyChose } from '../../../Data/whyChose';

function FeatureBox({ img, color, title, icon, text }) {
    return (
        <div className="col-lg-4" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <div className={`why-choose-box-3 features-box ${color}`}>
                <div className="thumbnail">
                    <img src={img} alt="why choose ujuzi" />
                </div>
                <div className="content">
                    <div className="icon">
                        <i className={`icon-${icon}`}></i>
                    </div>
                    <h4 className="title">{title}</h4>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}

const WhyChose = () => {
    const { mouseReverse } = useMouseMoveUI();
    return (
        <section className="why-choose-area-4 edu-section-gap">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Why Ujuzi</span>
                    <h2 className="title">Experiential <span className="color-secondary">learning
                    </span>  in STEM.
                     <br />(STEMEX)

                     </h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                {
                    whyChose.map(({img,title,text,icon,color}, index)=>(
                        <>
                         <FeatureBox color={color} img={img} title={title} icon={icon} text={text} key={index}/>
                        </>
                    )

                    )
                }
                    {/* <FeatureBox color="color-primary-style" img="03" icon="45" title="Experiential learning of STEM"
                    text="We enable experiential learning of STEM by combining theory, simulation, practical demonstration, project learning, and gamification." />

                    <FeatureBox color="color-secondary-style" img="04" icon="46" title="Unlock applicability of STEM"
                    text="We enable students to connect theoretical concepts learned in STEM subjects like physics with real-world applications." />

                    <FeatureBox color="color-extra08-style" img="05" icon="47" title="Hands-on teaching methods"
                    text="Our teaching methods emphasize hands-on skills to prepare students for future STEM-related opportunities." />
                                        {/* <FeatureBox color="color-extra08-style" img="05" icon="47" title="Hands-on teaching methods" */}
                    {/* text="Our teaching methods emphasize hands-on skills to prepare students for future STEM-related opportunities." /> */} 
                </div>
                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <img className="rotateit" src={require('../../../images/about/shape-13.png')} alt="shape" />
                    </li>
                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        } }
                    >
                        <span></span>
                    </motion.li>
                    <li className="shape-3 circle scene sal-animate" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <span className="d-block"></span>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default WhyChose;