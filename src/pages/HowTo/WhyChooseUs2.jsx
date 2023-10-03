import React from 'react';
import ChoseBox from './chose-box-item';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../Component/contexts/mouse-move-context';

const WhyChooseUs2 = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <section className="why-choose-area-2 section-gap-large">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Harvest the fruits of Ujuzi</span>
                    <h2 className="title">The Best <span className="color-secondary">Experitial</span> learning <br /> in STEM<sub>Ex</sub></h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    <ChoseBox color="color-primary-style" icon="45" title="High Quality online instructions" subtitle="These instructions are meticulously designed by subject matter experts to ensure clarity, comprehensibility, and engagement. They often include interactive elements such as practicles, discussion forums, and multimedia content to enhance the learning experience." />

                    <ChoseBox color="color-secondary-style" icon="46" title="Unlock Personalized growth in education" subtitle="
get tailored learning for each individual’s unique needs and abilities. Ujuzi recognizes that each learner is unique and that a one-size-fits-all approach may not be the most effective. Unlocking personalized growth in education empowers learners to take ownership of their learning journey
" />

                    <ChoseBox color="color-extra08-style" icon="47" title="Understand and innovate" subtitle="Ujuzi emphasizes the importance of gaining a deep understanding of a subject and then using that knowledge to create new and improved solutions. This approach fosters creativity, critical thinking, and problem-solving skills, encouraging learners to be innovative" />
                </div>
                <ul className="shape-group">
                    <li className="shape-5" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <span></span>
                    </li>
                </ul>
            </div>
            <ul className="shape-group">
                <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <span></span>
                </motion.li>
                <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <img src={require('../../images/about/shape-13.png')} alt="shape" />
                </motion.li>
                <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                    animate={ {
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y
                    } }
                >
                    <span></span>
                </motion.li>
                <motion.li className="shape-4 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                    animate={ {
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y
                    } }
                >
                    <img src={require('../../images/about/shape-40.png')} alt="shape" />
                </motion.li>
            </ul>
        </section>
    )
}

export default WhyChooseUs2;