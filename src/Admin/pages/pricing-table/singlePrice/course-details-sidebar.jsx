import React from 'react';
import useModal from '../../../../hooks/use-modal';
import VideoModal from '../../../../Component/modules/components/popup-modal/video-modal';
import Books from '../../../../Component/modules/books';
// import useModal from '../../../hooks/use-modal';
// import { Books } from '../../../svg';
// import VideoModal from '../popup-modal/video-modal';

const CourseDetailsSidebar = ({ course, details_2=false, isAlreadySubscribed=false, packageId }) => {
    const { img, certificate, videoId, course_price, instructor, duration, student, language } = course || {};
    const { isVideoOpen, setIsVideoOpen } = useModal();
    return (
        <>
            <div className={`course-sidebar-3 ${details_2?'':'sidebar-top-position'}`}>
                <div className="edu-course-widget widget-course-summery">
                    <div className="inner">
                        <div className="thumbnail">
                            <img src={`/assets/images/course/course-01/${img}`} alt="Course Thumb" />
                            <a onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }} className="play-btn video-popup-activation">
                                <i className="icon-18"></i>
                            </a>
                        </div>
                        <div className="content">
                            <h4 className="widget-title">Course Includes:</h4>
                            <ul className="course-item">
                                <li>
                                    <span className="label"><i className="icon-60"></i>Price:</span>
                                    <span className="value price">${course_price}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-62"></i>Instrutor:</span>
                                    <span className="value">{instructor}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-61"></i>Duration:</span>
                                    <span className="value">{duration}</span>
                                </li>

                                <li>
                                    <span className="label">
                                        <Books />
                                        Lessons:</span>
                                    <span className="value">8</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-63"></i>Enrolled:</span>
                                    <span className="value">{student} students</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-59"></i>Language:</span>
                                    <span className="value">{language}</span>
                                </li>

                                <li>
                                    <span className="label"><i className="icon-64"></i>Certificate:</span>
                                    <span className="value">{certificate}</span>
                                </li>
                            </ul>

                            {isAlreadySubscribed ? (
                                <div className="alert alert-info" style={{ marginTop: '20px', padding: '15px', borderRadius: '5px', backgroundColor: '#e3f2fd', border: '1px solid #90caf9' }}>
                                    <i className="icon-20" style={{ marginRight: '8px' }}></i>
                                    You are already subscribed to this package
                                </div>
                            ) : (
                                <div className="read-more-btn">
                                    <a href="/#" className="edu-btn">Subscribe Now <i className="icon-4"></i></a>
                                </div>
                            )}

                            <div className="share-area">
                                <h4 className="title">Share On:</h4>
                                <ul className="social-share">
                                    <li><a href="/#"><i className="icon-facebook"></i></a></li>
                                    <li><a href="/#"><i className="icon-twitter"></i></a></li>
                                    <li><a href="/#"><i className="icon-linkedin2"></i></a></li>
                                    <li><a href="/#"><i className="icon-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* video modal start */}
            <VideoModal isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={videoId} />
            {/* video modal end */}
        </>
    )
}

export default CourseDetailsSidebar;