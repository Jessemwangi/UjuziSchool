import React from 'react';
import TeamThree from "../../team-member/team-three";
 import members from '../../../Data/members';

const TeamArea = () => {
    return (
        <div className="edu-team-area team-area-3 edu-section-gap z-10">
            <div className="container">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <span className="pre-title">Meet us</span>
                    <h2 className="title">The face of Ujuzi</h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <div className="row g-5">
                    {members.slice(0,3).map((member) => (
                        <div key={member.id} className="col-lg-4 col-md-6" data-sal-delay={member.delay} data-sal="slide-up" data-sal-duration="800">
                            <TeamThree member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamArea;