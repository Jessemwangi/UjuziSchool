import React from 'react';
import { Link } from 'react-router-dom';
const TeamThree = ({ member }) => {
    return (
        <div className="edu-team-grid team-style-3">
            <div className="inner">
                <div className="thumbnail-wrap">
                    <div className="thumbnail">
                        <Link to={`/teamdetails/${member.id}`}>
                          
                                <img src={member.img} alt="team images" />
                            
                        </Link>
                    </div>
                    <ul className="team-share-info">
                        {member.social_links.map((social, i) => (
                            <li key={i}>
                                <a href={social.link} target={social.target ? social.target : ''}>
                                    <i className={social.icon}></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="content">
                    <h5 className="title" style={{color:"white", background:"#12111185"}}>
                        <Link to={`/teamdetails/${member.id}`}>
                            {member.name}
                        </Link>
                    </h5>
                    <span className="designation" style={{color:"white",background:"#12111185"}}>{member.title}</span>
                </div>
            </div>
        </div>
    )
}

export default TeamThree;