import React from 'react';
import { Link } from 'react-router-dom';

const CertCardsDisplay = ({ data, classes }) => {




    // handle add to cart


    return (
        <div className={`edu-course course-style-5 ${ classes ? classes : '' }`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        <a>
                            <img src={`/assets/images/course/course-04/${data.img}`} alt="Course Meta" />
                        </a>
                    </Link>
                </div>
                <div className="content">
                    <div className="course-price price-round">${Math.trunc(data.course_price)}</div>
                    <span className="course-level">{data.level}</span>
                    <h5 className="title">
                        <Link href={`/course-details/${data.id}`}>
                            <a>{data.title}</a>
                        </Link>
                    </h5>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating})</span>
                    </div>
                    <p>{data.short_desc}</p>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>
            
            <div className="hover-content-aside">
                <div className="content">
                    <span className="course-level">{ data.category }</span>
                    <h5 className="title">
                        <n-link to="/course/course-details">{ data.title }</n-link>
                    </h5>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({ data.rating })</span>
                    </div>
                    <ul className="course-meta">
                        <li>{ data.lesson } { data.lesson + data.lesson > 1 ? 'Lessons' : 'Lesson' }</li>
                        <li>{ data.duration }</li>
                        <li>{ data.level }</li>
                    </ul>
                    <div className="course-feature">
                        <h6 className="title">What You’ll Learn?</h6>
                        <ul>
                            { 
                                data.features.slice(0, 3).map( (feature, featurekey) => <li key={ featurekey }>{ feature }</li> )
                            }
                        </ul>
                    </div>
                    <div className="button-group">
                        <a className="edu-btn btn-medium" 
                        style={{cursor:'pointer'}}>
                           Download / View
                            <i className="icon-4"></i>
                        </a>

                        <button className={`wishlist-btn btn-outline-dark active}`}>
                            <i className="icon-22"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertCardsDisplay;