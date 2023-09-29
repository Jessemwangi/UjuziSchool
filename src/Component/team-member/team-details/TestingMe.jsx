import React from 'react';
import TeamDetails from './TeamDetails';
import instructors_data from '../../../Data/instructors';
import TeamArea from './team-area';
import CourseArea from './course-area';

const TestingMe = () => {
    const id =2
    const team = instructors_data.find(item => Number(item.id) === Number(id))
    console.log(team)
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">

                <TeamArea team={team} />
                <CourseArea name={team.name}/>
               
            </div>
        </div>
    );
};

export default TestingMe;