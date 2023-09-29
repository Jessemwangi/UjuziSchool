import React from 'react';
import CourseArea from './course-area';
import TeamArea from './team-area';

const TeamDetails = ({team}) => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">

                <TeamArea team={team} />
                <CourseArea name={team.name}/>
               
            </div>
        </div>
    )
}

export default TeamDetails;