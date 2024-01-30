import React, { useState } from 'react';
import { cert_data } from '../../Data/certificates';
import CertCardsDisplay from './CertCardsDisplay';


const Certificates = () => {
    const certPerView = 6;
    const [next, setNext] = useState(certPerView);
    const [certs, setCerts] = useState(cert_data);
    // handleLoadData
    const handleLoadData = () => {
        setNext(value => value + 3)
    }
    return (
        <div className="edu-course-area course-area-1 gap-tb-text">
            <div className="container">
                {/* <CertSortingArea cert_items={cert_data} num={certs?.slice(0,next)?.length} setCourses={setCerts} certs={certs} /> */}
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <h2 className="title">Ujuzi Certified and Achievements</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>
                <div className="row g-5">
                    { certs?.slice(0, next)?.map((course, key) => (
                        <div key={course.id} 
                            className={ `col-12 col-xl-4 col-lg-6 col-md-6 
                                ${ ( key+1 ) % 3 === 0 && key !== 0 ? 'course-style-3-third-item' : '' } 
                                ${ ( key+1 ) % 2 === 0 && key !== 0 ? 'course-style-3-even' : 'course-style-3-odd' }` 
                            }
                        >
                            <CertCardsDisplay data={course} />
                        </div>
                    ) ) }
                </div>

                {next < certs.length && 
                    <div onClick={handleLoadData} className="load-more-btn" data-sal-delay="100" data-sal="slide-up" data-sal-duration="1200">
                        <a className="edu-btn" style={{ cursor: 'pointer' }}>Load More <i className="icon-56"></i></a>
                    </div>
                }
            </div>
        </div>
    )
};

export default Certificates;