
import React from 'react';
import { Link } from 'react-router-dom';

const EventListItem = (item) => {
   
  const { img, date, time, title, sm_desc, event_meta , id } = item.item;
    return (
        <div className="inner">
            <div className="thumbnail">
                <Link to={`/event-details/${id}`}>
                 
                        <img src={img[0].formats.thumbnail.url} alt="Event Images" />
                        
                </Link>
            </div>
            <div className="content">
                <ul className="event-meta">
                    <li><i className="icon-27"></i>{date}</li>
                    <li><i className="icon-33"></i>{time}</li>
                </ul>
                <h4 className="title">
                    <Link to={`/event-details/${id}`}>
                    {title}
                    </Link>
                </h4>
                <span className="event-location"><i className="icon-40"></i>{event_meta}</span>
                <p>{sm_desc.slice(0, 120)}....</p>
                <div className="read-more-btn">
                    <Link  className="edu-btn btn-medium btn-border" to={`/event-details/${id}`}>
                        
                            Learn More <i className="icon-4"></i>
                       
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EventListItem;