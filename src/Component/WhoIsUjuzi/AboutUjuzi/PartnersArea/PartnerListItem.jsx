import React from 'react';

const PartnerListItem = ({ item }) => {
    const  {
        img,
        country,
        dateSigned,
        month,
        year,
        id,
        logo,
        name,
        descrip,
    } = item || {};
    return (
        <div className="inner">
            <div className="thumbnail">
                        <img src={require('../../../../images/brand/' + img)} alt={name} />

                <div className="event-time">
                    <span>🫱🏻‍🫲🏽</span>
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
                        <a className="edu-btn btn-small btn-secondary">
                            Visit there site <i className="icon-4"></i>
                        </a>
                    
                </div>
            </div>
        </div>
    )
}

export default PartnerListItem;