import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
// import { Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoModal from "../modules/components/popup-modal/video-modal";
import useModal from "../../hooks/use-modal";
import { useMouseMoveUI } from "../contexts/mouse-move-context";

const testimonial_data = [
    {
        img: '/assets/images/testimonial/testimonial-01.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Ray Sanchez',
        title: 'Student'
    },
    {
        img: '/assets/images/testimonial/testimonial-02.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Thomas Lopez',
        title: 'Designer'
    },
    {
        img: '/assets/images/testimonial/testimonial-03.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Amber Page',
        title: 'Developer'
    },
    {
        img: '/assets/images/testimonial/testimonial-04.png',
        desc: 'Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.',
        ratings: <>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
            <i className="icon-23"></i>
        </>,
        name: 'Robert Tapp',
        title: 'Content Creator'
    }
]

export default function VideoTestimonial() {
    const [loop,setLoop] = useState(true);
    const { isVideoOpen, setIsVideoOpen } = useModal();
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    // useEffect(() => setLoop(true) ,[])
    const handleVideoClick = () => {
        setLoop(false);
        setIsVideoOpen(true);
      };
    
      const handleVideoClose = () => {
        setLoop(true);
        setIsVideoOpen(false);
      };
    
      useEffect(() => {
        if (isVideoOpen) {
          setLoop(false);
        } else {
          setLoop(true);
        }
      }, [isVideoOpen]);
    return (
        <div className="testimonial-area-1 section-gap-equal">
            <div className="container">
                <div className="row g-lg-5">
                    <div className="col-lg-5">
                        <div className="testimonial-heading-area">
                            <div className="section-title section-left" data-sal-delay="50" data-sal="slide-up" data-sal-duration="800">
                                <span className="pre-title">Testimonials</span>
                                <h2 className="title">Why Our STEMEX solution</h2>
                                <span className="shape-line"><i className="icon-19"></i></span>
                                <p>Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim.</p>
                                <Link to="#" className="edu-btn btn-large">View All Testimonials<i className="icon-4"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" >
                    <motion.li className="shape-3 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                            animate={ {
                                x: mouseDirection(40).x,
                                y: mouseDirection(40).y
                            } }
                        >
                            <span></span>
                        </motion.li>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={0}
                            loop={loop}
                            className="home-one-testimonial-activator swiper "
                            modules={[Pagination, Autoplay]}
                            pagination={{
                                el: '.swiper-pagination',
                                type: 'bullets',
                                clickable: true
                            }
                            }
                            grabCursor={true}
                            speed={2000}
                            autoplay={{
                                delay: 3500
                            }}

                            breakpoints={{
                                577: {
                                slidesPerView: 1
                                }
                            }}
                        >
                            {testimonial_data.map((testi, i) => (
                            // <div className="col-lg-6">
                                <SwiperSlide key={i}>
                                    <div className="video-gallery video-gallery-5" >
                                <div className="thumbnail">
                                    <img src={require('../../images/others/video-03.webp')} alt="Thumb" />
                                    <button onClick={handleVideoClick} className="video-play-btn video-popup-activation">
                                        <i className="icon-18"></i>
                                    </button>
                                </div>
                               
                                    
                                </div>
                                </SwiperSlide>
                                
                            // </div>
                                ))}
                        </Swiper>
                        {/* <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'svTS0WAl52E'} /> */}
                        <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={handleVideoClose} videoId={'svTS0WAl52E'} />                       
<ul className="shape-group">
                        <motion.li className="shape-2 scene" data-sal-delay="200" data-sal="fade" data-sal-duration="1000"
                            animate={ {
                                x: mouseReverse(30).x,
                                y: mouseReverse(30).y
                            } }
                        >
                            <img src={require('../../images/about/shape-25.png')} alt="Shape" />
                        </motion.li>

                    </ul>
               
                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="200" data-sal="fade" data-sal-duration="1000">
                        <img className="rotateit" src={require('../../images/about/shape-13.png')} alt="Shape" />
                    </li>
                </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
