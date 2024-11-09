import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../Component/contexts/mouse-move-context';
import { SocialShare } from '../Component/modules/components';
import ContactUsForm from '../Component/modules/form/contact-us-form';
import { Link } from 'react-router-dom';

const ContactUsArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <section className="contact-us-area">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-4 col-lg-6">
                        <div className="contact-us-info">
                            <h3 className="heading-title">{"We're"} Always Eager to Hear From You!</h3>
                            <ul className="address-list">
                                <li>
                                    <h5 className="title">Address</h5>
                                    <p>Simonkyläntie 11 B 9 01390 Vantaa</p>
                                </li>
                                <li>
                                    <h5 className="title">Email</h5>
                                    <p><a href="mailto:info@ujuzi.io">info@ujuzi.io</a></p>
                                </li>
                                <li>
                                    <h5 className="title">Phone</h5>
                                    <p><a href="tel:+358 45 196 4808">(+358) 45 196 4808</a></p>
                                </li>
                            </ul>
                            <ul className="social-share">
                                <li><Link to="#"><i className="icon-share-alt"></i></Link></li>
                                <SocialShare/>
                            </ul>
                        </div>
                    </div>

                    <div className="offset-xl-2 col-lg-6">
                        <div className="contact-form form-style-2">
                            <div className="section-title">
                                <h4 className="title">Get In Touch</h4>
                                <p>Fill out this form for booking a consultant advising session.</p>
                            </div>
                            {/* form start */}
                            <ContactUsForm />
                            {/* form end */}
                            <ul className="shape-group">
                                <motion.li className="shape-1 scene"
                                    animate={ {
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y
                                    } }
                                >
                                    <img src={require('../images/about/shape-13.png')} alt="Shape" />
                                </motion.li>
                                <motion.li className="shape-2 scene"
                                    animate={ {
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y
                                    } }
                                >
                                    <img src={require('../images/counterup/shape-02.png')} alt="Shape" />
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUsArea;