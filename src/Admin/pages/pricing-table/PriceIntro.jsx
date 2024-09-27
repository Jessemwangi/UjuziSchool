import { useMouseMoveUI } from '../../../Component/contexts/mouse-move-context';
import { motion } from 'framer-motion';
import useModal from '../../../hooks/use-modal';
import VideoModal from '../../../Component/modules/components/popup-modal/video-modal';

const features_list = ['Affordable prices','Customizable','Lifetime Access','Quick and easy Setup']

const PriceIntro = () => {
    const { isVideoOpen, setIsVideoOpen } = useModal();
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <>
            <div className="edu-about-area about-style-1">
                <div className="container edublink-animated-shape">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="about-image-gallery">
                                <img className="main-img-1" src={require('../../../images/about/about-01.webp')} alt="affordable prices " />
                                <div className="video-box" data-sal-delay="150" data-sal="slide-down" data-sal-duration="800">
                                    <div className="inner">
                                        <div className="thumb">
                                            <img src={require('../../../images/about/about-02.webp')} alt="price one" />
                                            <button onClick={() => setIsVideoOpen(true)} className="popup-icon video-popup-activation border-0">
                                            <i className="icon-18"></i>
                                            </button>
                                        </div>
                                        <div className="loading-bar">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="award-status bounce-slide">
                                    <div className="inner">
                                        <div className="icon">
                                            <i className="icon-21"></i>
                                        </div>
                                        <div className="content">
                                            <h6 className="title">29+</h6>
                                            <span className="subtitle">customizable plans</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="shape-group">
                                    <motion.li className="shape-1 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                        animate={ {
                                            x: mouseReverse(25).x,
                                            y: mouseReverse(25).y
                                        } }
                                    >
                                        <img src={require('../../../images/about/shape-36.png')} alt="Shape" />
                                    </motion.li>
                                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                        animate={ {
                                            x: mouseDirection(25).x,
                                            y: mouseDirection(25).y
                                        } }
                                    >
                                        <img src={require('../../../images/about/shape-37.png')} alt="Shape" />
                                    </motion.li>
                                    <motion.li className="shape-3 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                        animate={ {
                                            x: mouseReverse(25).x,
                                            y: mouseReverse(25).y
                                        } }
                                    >
                                        <img src={require('../../../images/about/shape-02.png')} alt="Shape" />
                                    </motion.li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6" data-sal-delay="150" data-sal="slide-left" data-sal-duration="800">
                            <div className="about-content">
                                <div className="section-title section-left">
                                    <span className="pre-title">Our Prices</span>
                                    <h2 className="title">You do not need to stick with current packages <span className="color-secondary">Get customized</span></h2>
                                    <span className="shape-line"><i className="icon-19"></i></span>
                                    <p>To cater to everyone's needs, our pricing is not limited to the existing packages. Instead, we offer the flexibility to customize a package that suits your specific requirements. Feel free to reach out to us or get in touch with our sales team to discuss your customization options.

                                    </p>
                                </div>
                                <ul className="features-list">
                                    {features_list.map((l,i) => <li key={i}>{l}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="shape-group">
                        <motion.li className="shape-1 circle scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                            animate={ {
                                x: mouseDirection(25).x,
                                y: mouseDirection(25).y
                            } }
                        >
                            <span className="d-block"></span>
                        </motion.li>
                    </ul>
                </div>
            </div>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId="PICj5tr9hcc" />
            {/* video modal end */}
        </>
    );
};

export default PriceIntro;