import React from 'react';

const TeamArea = ({ team }) => {
    return (
        <div className="edu-team-details-area section-gap-equal">
            <div className="container">
                <div className="row row--40">
                    <div className="col-lg-4">
                        <div className="team-details-thumb">
                            <div className="thumbnail">
                                <img src={team.img} alt="team images" />
                            </div>

                            <ul className="social-share">
                                <li><a href="/#"><i className="icon-share-alt"></i></a></li>
                                {team?.social_links?.map((social, i) => (
                                    <li key={i}>
                                        <a href={social.link} target={social.target ? social.target : ''}>
                                            <i className={social.icon}></i>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="team-details-content">
                            <div className="main-info">
                                <span className="subtitle">Ujuzi Member</span>
                                <h3 className="title">{team?.name}</h3>
                                <span className="designation">{team?.title}</span>
                                <ul className="team-meta">
                                    <li><i className="icon-25"></i>10 Years</li>
                                    <li>
                                        <div className="rating">
                                            <i className="icon-23"></i>
                                            <i className="icon-23"></i>
                                            <i className="icon-23"></i>
                                            <i className="icon-23"></i>
                                            <i className="icon-23"></i>
                                        </div>
                                        <span className="rating-count"></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bio-describe">
                                <h4 className="title">About Me</h4>
                                <p>{team?.about_me}</p>
                               
                            </div>

                            <div className="contact-info">
                                <h4 className="title">Contact Me</h4>
                                <ul>
                                    <li><span>Address:</span>{team?.address}</li>
                                    <li><span>Email:</span><a href={team?.email} target="_blank" rel="noreferrer">{team?.email}</a></li>
                                    <li><span>Phone:</span><a href={team?.phone}>{team?.phone}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamArea;