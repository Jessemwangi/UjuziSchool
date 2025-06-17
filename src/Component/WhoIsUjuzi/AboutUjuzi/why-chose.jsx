import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../contexts/mouse-move-context';
import { whyChose } from '../../../Data/whyChose';

function FeatureBox({ img, color, title, icon, text, link }) {
    const handleClick = () => {
        if (link) {
            // Check if it's an external link
            if (link.startsWith('http://') || link.startsWith('https://')) {
                window.open(link, '_blank', 'noopener noreferrer');
            } else {
                // Internal navigation - you can replace this with your router navigation
                window.location.href = link;
            }
        }
    };

    return (
        <div className="col-lg-4" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
            <motion.div 
                className={`why-choose-box-3 features-box ${color} ${link ? 'clickable-feature' : ''}`}
                onClick={handleClick}
                whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                }}
                style={{
                    cursor: link ? 'pointer' : 'default',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                    if (link) {
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-8px)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (link) {
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }
                }}
            >
                {/* Hover overlay effect */}
                {link && (
                    <motion.div
                        className="hover-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                )}

                <div className="thumbnail" style={{ position: 'relative', zIndex: 2 }}>
                    <img src={img} alt="why choose ujuzi" />
                    {/* Click indicator */}
                    {link && (
                        <motion.div
                            className="click-indicator"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ 
                                opacity: 1, 
                                scale: 1,
                                transition: { duration: 0.2 }
                            }}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '30px',
                                height: '30px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                color: '#333',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <i className="icon-arrow-right-line"></i>
                        </motion.div>
                    )}
                </div>

                <div className="content" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div 
                        className="icon"
                        whileHover={link ? { 
                            rotate: 10,
                            scale: 1.1,
                            transition: { duration: 0.2 }
                        } : {}}
                    >
                        <i className={`icon-${icon}`}></i>
                    </motion.div>
                    
                    <h4 className="title" style={{ 
                        transition: 'color 0.3s ease',
                        ...(link && {
                            ':hover': {
                                color: '#ff6b35'
                            }
                        })
                    }}>
                        {title}
                        {link && (
                            <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 5 }}
                                style={{
                                    display: 'inline-block',
                                    marginLeft: '8px',
                                    fontSize: '0.8em',
                                    opacity: 0.7,
                                }}
                            >
                                →
                            </motion.span>
                        )}
                    </h4>
                    
                    <p style={{ 
                        transition: 'color 0.3s ease',
                        marginBottom: link ? '1rem' : '0'
                    }}>
                        {text}
                    </p>

                    {/* Call-to-action hint */}
                    {link && (
                        <motion.div
                            className="cta-hint"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ 
                                opacity: 1, 
                                y: 0,
                                transition: { duration: 0.2, delay: 0.1 }
                            }}
                            style={{
                                fontSize: '0.85rem',
                                color: '#666',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                marginTop: '8px',
                            }}
                        >
                            Learn More
                        </motion.div>
                    )}
                </div>

                {/* Subtle shine effect on hover */}
                {link && (
                    <motion.div
                        className="shine-effect"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ 
                            x: '100%', 
                            opacity: 0.3,
                            transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            pointerEvents: 'none',
                            zIndex: 3,
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}

const WhyChose = () => {
    const { mouseReverse } = useMouseMoveUI();
    
    return (
        <section className="why-choose-area-4 edu-section-gap">
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Ujuzi Portfolios</span>
                    <h2 className="title">
                        Experiential <span className="color-secondary">learning</span> in STEM.
                        <br />(STEMEX)
                    </h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                    {whyChose.map(({ img, title, text, icon, color, link }, index) => (
                        <FeatureBox 
                            key={index}
                            color={color} 
                            img={img} 
                            title={title} 
                            icon={icon} 
                            text={text} 
                            link={link}
                        />
                    ))}
                </div>

                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <img className="rotateit" src={require('../../../images/about/shape-13.png')} alt="shape" />
                    </li>
                    <motion.li 
                        className="shape-2 scene" 
                        data-sal-delay="500" 
                        data-sal="fade" 
                        data-sal-duration="200"
                        animate={{
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        }}
                    >
                        <span></span>
                    </motion.li>
                    <li className="shape-3 circle scene sal-animate" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <span className="d-block"></span>
                    </li>
                </ul>
            </div>

            {/* Add custom CSS for additional styling */}
            <style jsx>{`
                .clickable-feature {
                    user-select: none;
                }
                
                .clickable-feature:hover .title {
                    color: #ff6b35 !important;
                }
                
                .clickable-feature:active {
                    transform: scale(0.98) !important;
                }
                
                @media (max-width: 768px) {
                    .clickable-feature:hover {
                        transform: none !important;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default WhyChose;