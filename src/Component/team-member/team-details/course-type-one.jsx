import React from 'react';
import { Link } from 'react-router-dom';

const CourseTypeOne = ({ data, classes, image_location_path='01' }) => {
 

    return (
        <div className={`edu-course course-style-1 ${ classes ? classes : '' } hover-button-bg-white`}>
            <div className="inner">
                <div className="thumbnail">
                    <Link href={`/course-details/${data.id}`}>
                        
                            <img src={`/assets/images/course/course-${image_location_path}/${data.img}`} alt="Course Meta" />
                       
                    </Link>
                    <div className="time-top">
                        <span className="duration"><i className="icon-61"></i>{data.duration}</span>
                    </div>
                </div>
                <div className="content">
                    <span className="course-level">{data.level}</span>
                    <h6 className="title">
                        <a href="/#">{data.title}</a>
                    </h6>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating} /{data.rating_count} Rating)</span>
                    </div>
                    <div className="course-price">${data.course_price}</div>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                </div>
            </div>

            <div className="course-hover-content-wrapper">
                <button className= ''><i className="icon-22"></i></button>
            </div>
            
            <div className="course-hover-content">
                <div className="content">
                    <button  className= ''>
                        <i className="icon-22"></i>
                    </button>
                    <span className="course-level">{data.level}</span>
                        <h6 className="title">
                            <Link href={`/course-details/${data.id}`}>
                                {data.title}
                            </Link>
                        </h6>
                    <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating} /{data.rating_count} Rating)</span>
                    </div>
                    <div className="course-price">${data.course_price}</div>
                    <p>{data.short_desc}</p>
                    <ul className="course-meta">
                        <li><i className="icon-24"></i>{data.lesson} Lessons</li>
                        <li><i className="icon-25"></i>{data.student} Students</li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default CourseTypeOne;