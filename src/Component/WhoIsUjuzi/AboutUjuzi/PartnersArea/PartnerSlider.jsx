import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';


const PartnerSlider = ({items}) => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div>
             <section className="testimonial-area-6 gap-bottom-equal">
                            <div className="container edublink-animated-shape">
                               
                                    <div className="col-lg-12">

            
                                        <Swiper
                                            className="testimonial-activation-5 swiper "
                                            grabCursor={true}
                                             speed={1000}
                                            spaceBetween={0}
                                            slidesPerView={7}
                                            autoplay={{
                                              delay: 2500,
                                              disableOnInteraction: false,
                                            }}
                                            pagination={{
                                              clickable: true,
                                              el: '.swiper-pagination',
                                              type:'bullets'
                                            }}
                                            navigation={false}
                                            modules={[Autoplay, Pagination, Navigation]}
                                        >
                                            {items.map((item, i) => {
                                               
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="testimonial-slide testimonial-style-3">
                                                            <div className="content">
                                                                {/* <div className="rating-icon">
                                                                    {ratings.map(r => <i key={r} className="icon-23"></i>)}
                                                                </div> */}
                                                                {/* <p>{desc}</p> */}
                                                                <div className="author-info">
                                                                    <div className="thumb">
                                                                        <img src={require('../../../../images/brand/' + item.logo)} title={item.name} alt={item.name} />
                                                                    </div>
                                                                    {/* <div className="info">
                                                                        <h5 className="title">{name}</h5>
                                                                        <span className="subtitle">{title}</span>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                            <div className="swiper-pagination"></div>
                                        </Swiper>
                                    </div>
            
                                
                                <ul className="shape-group">
                                    <motion.li className="shape-2 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                                        animate={ {
                                            x: mouseReverse(30).x,
                                            y: mouseReverse(30).y
                                        } }
                                    >
                                        <img src={require('../../../../images/about/shape-25.png')} alt="Shape" />
                                    </motion.li>
                                    <motion.li className="shape-3 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                                        animate={ {
                                            x: mouseDirection(40).x,
                                            y: mouseDirection(40).y
                                        } }
                                    >
                                        <span></span>
                                    </motion.li>
                                </ul>
                            </div>

                        </section>
        </div>
    );
};

export default PartnerSlider;