import React, { useEffect, useState } from 'react';
// import { instructors_data } from '../../data';
import Time from '../../UtilitiesFunctions/time';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeSingleEvents } from '../../redux/features/get-single-events-slice';
// import TeamOne from "../team-member/team-one";

const EventDetailsArea = () => {
    const { id } = useParams();
    console.log(id)
    
    const dispatch = useDispatch();
    // const Url =`https://ujuziapi.onrender.com/api/events/${id}?populate=*`;
    const Url =`${process.env.REACT_APP_SERVER_URL}/events/${id}?populate=*`;
    useEffect(() => {
        dispatch(initializeSingleEvents(Url))
      }, [Url, dispatch, id]);
      const singleEvent = useSelector((state) => state.singleEvent.singleEventsData);
      console.log('^^^^^^^^^^^^^^^^^^^^ ', singleEvent ,' *********************************88')
      const eventDetails=singleEvent?.data?.attributes
  return (
        <section className="event-details-area edu-section-gap">
            <div className="container">
                <div className="event-details">
                    <div className="main-thumbnail">
                        <img src={eventDetails?.img?.data[0]?.attributes?.formats?.large?.url} alt="Event" />
                    </div>
                    <div className="row row--30">
                        <div className="col-lg-8">
                            <div className="details-content">
                                <h3>{eventDetails?.title}</h3>
                                <p>{eventDetails?.sm_desc}</p>
                                <h3>Event Location</h3>
                                <ul className="event-meta">
                                    <li><i className="icon-40"></i>{eventDetails?.event_meta}</li>
                                    <li><i className="icon-71"></i>+358 (415) 6789</li>
                                </ul>
                                <div className="gmap_canvas">
                                <iframe id="gmap_canvas" title='Event Location'
  src={`https://maps.google.com/maps?q=${encodeURIComponent(eventDetails?.event_meta)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
></iframe>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="course-sidebar-3">
                                <div className="edu-course-widget widget-course-summery">
                                    <div className="inner">
                                        <div className="content">
                                            <h4 className="widget-title">Event Info</h4>
                                            <ul className="course-item">
                                                <li>
                                                    <span className="label"><i className="icon-60"></i>Cost:</span>
                                                    <span className="value price">$70.00</span>
                                                </li>
                                                <li>
                                                    <span className="label"><i className="icon-70"></i>Total Slot:</span>
                                                    <span className="value">30</span>
                                                </li>
                                                <li>
                                                    <span className="label"><i className="icon-68"></i>Booked Slot:</span>
                                                    <span className="value">2</span>
                                                </li>
                                            </ul>
                                            <div className="read-more-btn">
                                                <a href="#" className="edu-btn">Book Now <i className="icon-4"></i></a>
                                            </div>
                                            <div className="countdown">
                                                <div className="countdown-section">
                                                    <div>
                                                        <div className="countdown-number day">{Time('2023-12-5 00:00:00').days}</div>
                                                        <div className="countdown-unit">Days</div>
                                                    </div>
                                                </div>
                                                <div className="countdown-section">
                                                    <div>
                                                        <div className="countdown-number hour">{Time('2023-12-5 00:00:00').hours}</div>
                                                        <div className="countdown-unit">Hrss</div>
                                                    </div>
                                                </div>
                                                <div className="countdown-section">
                                                    <div>
                                                        <div className="countdown-number minute">{Time('2023-12-5 00:00:00').minutes}</div>
                                                        <div className="countdown-unit">Mints</div>
                                                    </div>
                                                </div>
                                                <div className="countdown-section">
                                                    <div>
                                                        <div className="countdown-number second" suppressHydrationWarning>{Time('2023-12-5 00:00:00').seconds}</div>
                                                        <div className="countdown-unit">Sec</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event-speaker">
                    <h3 className="heading-title">Event Speakers</h3>
                    <div className="row g-5">
                        {/* {instructors_data.slice(0,4).map((instructor) => (
                            <div key={instructor.id} className="col-lg-3 col-sm-6 col-12" data-sal-delay={instructor.delay} data-sal="slide-up" data-sal-duration="800">
                                <TeamOne instructor={instructor} />
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetailsArea;