import React from 'react';
import CourseTypeOne from './course-type-one';
import course_data from '../../../Data/course-data';


const CourseArea = ( { name } ) => {
    // fetching only specific courses where instructor name get matched
    const courses = course_data.filter(course => course.instructor === name );
    return (
        <>
            { courses.length > 0 &&
                <div className="edu-course-area course-area-1 edu-section-gap bg-lighten01">
                    <div className="container">
                        <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" 
                        data-sal-duration="800">
                            <h2 className="title">My Popular Courses</h2>
                        </div>
                        
                        <div className="row g-5">
                            {courses.map((course) => {
                                return (
                                    <div className="col-md-6 col-xl-3" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800" key={course.id}>
                                        <CourseTypeOne data={course} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CourseArea;