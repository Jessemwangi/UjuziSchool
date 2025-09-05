import { useDispatch, useSelector } from "react-redux";
import event_data from "../../Data/event-data";
import EventListItem from "./event-list-item";
import EventSidebar from "./event-sidebar";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { initializeEvents } from "../../redux/features/get-events-slice";
import { useMouseMoveUI } from "../../Component/contexts/mouse-move-context";

const EventListArea = () => {
    const Url = `${process.env.REACT_APP_SERVER_URL}/events?populate=*`;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeEvents(Url))
    }, [Url, dispatch]);

    const { categories, dateFilters, cities } = useSelector((state) => state.event) || {};
    const eventsData = useSelector((state) => state.setEvents.eventsData);
    const event_lists = eventsData?.data;
    const {  mouseReverse } = useMouseMoveUI();

    // Helper function to check if date matches filter
    const isDateInRange = (createdAt, filterType) => {
        const eventDate = new Date(createdAt);
        const now = new Date();
        
        switch(filterType) {
            case 'today':
                return eventDate.toDateString() === now.toDateString();
            case 'tomorrow':
                const tomorrow = new Date(now);
                tomorrow.setDate(now.getDate() + 1);
                return eventDate.toDateString() === tomorrow.toDateString();
            case 'this_week':
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                return eventDate >= weekStart && eventDate <= weekEnd;
            case 'this_month':
                return eventDate.getMonth() === now.getMonth() && 
                       eventDate.getFullYear() === now.getFullYear();
            case 'any_day':
            default:
                return true;
        }
    };

    // Helper function to extract city/country from event_meta
    const extractCityFromMeta = (eventMeta) => {
        if (!eventMeta) return null;
        
        const cityPatterns = [
            'Japan', 'New York', 'England', 'Moscow', 'Paris', 'Helsinki', 
            'Finland', 'London', 'Berlin', 'Germany', 'France', 'Italy',
            'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark'
        ];
        
        return cityPatterns.find(city => 
            eventMeta.toLowerCase().includes(city.toLowerCase())
        );
    };

    // Enhanced filtering logic
    const filterData = event_lists?.filter((event) => {
        // Category filter
        const categoryMatch = categories?.length === 0 || 
            categories?.some((item) => event.category === item);

        // Date filter
        const dateMatch = dateFilters?.length === 0 || 
            dateFilters?.some((dateFilter) => isDateInRange(event.createdAt, dateFilter));

        // City filter
        const cityMatch = cities?.length === 0 || 
            cities.includes('all_cities') ||
            cities?.some((city) => {
                const eventCity = extractCityFromMeta(event.event_meta);
                return eventCity === city;
            });

        return categoryMatch && dateMatch && cityMatch;
    });

    return (
        <>
            {categories && categories.length === 0 &&
                event_data.length === 0 ? 
                <div className="preloader">
                    <div className="loader">
                        <div className="ytp-spinner">
                            <div className="ytp-spinner-container">
                                <div className="ytp-spinner-rotator">
                                    <div className="ytp-spinner-left">
                                        <div className="ytp-spinner-circle"></div>
                                    </div>
                                    <div className="ytp-spinner-right">
                                        <div className="ytp-spinner-circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :   

                <div className='sticky-header'>
                    <div id="main-wrapper" className="main-wrapper" style={{ paddingTop: '10rem' }}>
                        <section className="why-choose-area-4">
                            <div className="container edublink-animated-shape">
                                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                    <h2 className="title">Ujuzi <span className="color-secondary">Events</span> and.
                                        <br />(Workshops)
                                    </h2>
                                    <span className="shape-line"><i className="icon-19"></i></span>
                                </div>

                                <ul className="shape-group">
                                    <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                        <img className="rotateit" src={require('../../images/about/shape-13.png')} alt="shape" />
                                    </li>
                                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                                        animate={{
                                            x: mouseReverse(40).x,
                                            y: mouseReverse(40).y
                                        }}
                                    >
                                        <span></span>
                                    </motion.li>
                                    <li className="shape-3 circle scene sal-animate" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                                        <span className="d-block"></span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <div className="edu-event-area event-area-1 section-gap-equal">
                            <div className="container">
                                <div className="row g-5">
                                    <div className="col-lg-3 order-lg-2">
                                        <EventSidebar events={event_lists}/>
                                    </div>
                                    <div className="col-lg-9 order-lg-1 col-pr--35">
                                        <div className="row g-5">
                                            {filterData?.length > 0 ? filterData?.map((data) => (
                                                <div key={data?.id} className="col-12">
                                                    <div className="edu-event-list event-list-2">
                                                        <EventListItem item={data} id={data?.id} />
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="col-12">
                                                    <div className="text-center">
                                                        <p>No events found matching your filters.</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <ul className="edu-pagination top-space-30 justify-content-start">
                                    <li>
                                        <a href="//#" aria-label="Previous">
                                            <i className="icon-west"></i>
                                        </a>
                                    </li>
                                    <li className="active">
                                        <a href="/#">1</a>
                                    </li>
                                    <li>
                                        <a href="/#">2</a>
                                    </li>
                                    <li>
                                        <a href="/#">3</a>
                                    </li>
                                    <li className="more-next">
                                        <a href="/#">6</a>
                                    </li>
                                    <li>
                                        <a href="/#">8</a>
                                    </li>
                                    <li>
                                        <a href="/#" aria-label="Next">
                                            <i className="icon-east"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EventListArea;