import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../contexts/mouse-move-context';
import VideoModal from '../modules/components/popup-modal/video-modal';
import useModal from '../../hooks/use-modal';
import image1 from '../../images/testimonial/testimonial-01.png';
import image2 from '../../images/testimonial/testimonial-02.png';
import image3 from '../../images/testimonial/testimonial-03.png';

const contents = {
    pre_title: 'Testimonials',
    title: <>What students say <br /> about Ujuzi</>,
    testimonials: [
        {
            ratings: [1, 2, 3, 4, 5],
            desc: '“Thanks to STEMEX equipment, learning STEM is easy and hands-on. Its bringing me one step closer to my dream of becoming an engineer”.',
            author: image1,
            name: 'Faraja',
            title: 'student in Tazania'
        },
        {
            ratings: [1, 2, 3, 4, 5],
            desc: '“STEMEX by Ujuzi bridges STEM studies with real-world applications, revealing their importance and sparking a renewed passion for STEM in me.”.',
            author: image2,
            name: 'Kai',
            title: 'Student in Finland'
        },
        {
            ratings: [1, 2, 3, 4, 5],
            desc: '“Last year, I thought about giving up science subjects due to all the theories. Thanks to STEMEX, Im now committed to pursuing STEM and working towards developing technology solutions for my community”.',
            author: image3,
            name: 'Atieno',
            title: 'Student in Kenya'
        }
    ],
    video_title: 'Learn more about Ujuzi STEMEX revolution',
    video_id: '73LDNRUjSis'
}


const { pre_title, testimonials, title,video_id,video_title } = contents;

const TestimonialArea = () => {
    const [loop, setLoop] = useState(false);
    useEffect(() => setLoop(true), []);
    const { isVideoOpen, setIsVideoOpen } = useModal();
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <>
            <section className="testimonial-area-6 gap-bottom-equal">
                <div className="container edublink-animated-shape">
                    <div className="row row--40">
                        <div className="col-lg-6">
                            <div className="section-title section-left" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">{pre_title}</span>
                                <h2 className="title">{title}</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                            </div>

                            <Swiper
                                className="testimonial-activation-5 swiper "
                                slidesPerView={1}
                                spaceBetween={0}
                                modules={[Pagination, Autoplay]}
                                loop={loop}
                                grabCursor={true}
                                speed={1000}
                                autoplay={{
                                    delay: 3000
                                }}
                                pagination={{
                                    el: '.swiper-pagination',
                                    type: 'bullets',
                                    clickable: true
                                }}
                            >
                                {testimonials.map((item, i) => {
                                    const { author, desc, name, ratings, title } = item;
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className="testimonial-slide testimonial-style-3">
                                                <div className="content">
                                                    <div className="rating-icon">
                                                        {ratings.map(r => <i key={r} className="icon-23"></i>)}
                                                    </div>
                                                    <p>{desc}</p>
                                                    <div className="author-info">
                                                        <div className="thumb">
                                                            <img src={author} alt="Testimonial" />
                                                        </div>
                                                        <div className="info">
                                                            <h5 className="title">{name}</h5>
                                                            <span className="subtitle">{title}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                                <div className="swiper-pagination"></div>
                            </Swiper>
                        </div>

                        <div className="col-lg-6">
                            <div className="video-gallery video-gallery-5" data-sal-delay="150" data-sal="slide-left" data-sal-duration="800">
                                <div className="thumbnail">
                                    <img src={'https://res.cloudinary.com/dk4ruyonq/image/upload/v1732387923/video-03_evsjyd.png'} alt="Thumb" />
                                    <button onClick={() => setIsVideoOpen(true)} className="video-play-btn video-popup-activation">
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                                <div className="content">
                                    <h4 className="title">{video_title}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="shape-group">
                        <motion.li className="shape-2 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                            animate={ {
                                x: mouseReverse(30).x,
                                y: mouseReverse(30).y
                            } }
                        >
                            <img src={require('../../images/about/shape-25.png')} alt="Shape" />
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
                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="200" data-sal="fade" data-sal-duration="1000">
                        <img className="rotateit" src={require('../../images/about/shape-13.png')} alt="Shape" />
                    </li>
                </ul>
            </section>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={video_id} />
            {/* video modal end */}
        </>
    )
}

export default TestimonialArea;