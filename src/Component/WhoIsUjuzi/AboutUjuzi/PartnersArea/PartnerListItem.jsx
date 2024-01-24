import React from 'react';
import { Link } from 'react-router-dom';

const PartnerListItem = ({ item }) => {
    const  {
        img,
        country,
        dateSigned,
        month,
        year,
        name,
        descrip,
        website,
        logo
    } = item || {};
    return (
        <div className="inner">
            <div className="thumbnail">
                        <img src={require('../../../../images/brand/' + img)} alt={name} />

                <div className="event-time">
                    <span><img src={require('../../../../images/brand/' + logo)} title='logo' alt='logo' style={{width:'40px'}}/></span>
                </div>
            </div>
            <div className="content">
                <div className="event-date">
                    <span className="day">{dateSigned}</span>
                    <span className="month">{month}</span>
                    <span className="year">{year}</span>
                </div>
                <h5 className="title">
                        {name}
                   
                </h5>
                <p>{descrip}</p>
                <ul className="event-meta">
                    <li><i className="icon-40"></i>{country}</li>
                </ul>
                <div className="read-more-btn">
                        <Link className="edu-btn btn-small btn-secondary" to={website}>
                            Visit there site <i className="icon-4"></i>
                        </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default PartnerListItem;