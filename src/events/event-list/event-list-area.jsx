import { useDispatch, useSelector } from "react-redux";
import event_data  from"../../Data/event-data";
import EventListItem from "./event-list-item";
import EventSidebar from "./event-sidebar";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { initializeEvents } from "../../redux/features/get-events-slice";
import { useMouseMoveUI } from "../../Component/contexts/mouse-move-context";

const EventListArea = () => {
    // const Url =`${process.env.REACT_APP_SERVER_URL}/events?populate=*`;
    const Url =`https://ujuziapi.onrender.com/api/events?populate=*`;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeEvents(Url))
      }, [Url, dispatch]);
    const { categories } = useSelector((state) => state.event);
    const eventsData = useSelector((state) => state.setEvents.eventsData);
    const event_lists = eventsData?.data;
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    const filterData = event_lists?.filter(({attributes}) =>
    categories?.length !== 0
    ? categories?.some((item2) => attributes.category == item2)
    : attributes
    );
    

    return (
        <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper" style={{ paddingTop: '10rem' }} >
   
        <section className="why-choose-area-4" >
            <div className="container edublink-animated-shape">
                <div className="section-title section-center" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                
                    <h2 className="title">Ujuzi  <span className="color-secondary">Events
                    </span>  and.
                     <br />(Workshops)

                     </h2>
                    <span className="shape-line"><i className="icon-19"></i></span>
                </div>

                <ul className="shape-group">
                    <li className="shape-1" data-sal-delay="500" data-sal="fade" data-sal-duration="200">
                        <img className="rotateit" src={require('../../images/about/shape-13.png')} alt="shape" />
                    </li>
                    <motion.li className="shape-2 scene" data-sal-delay="500" data-sal="fade" data-sal-duration="200"
                        animate={ {
                            x: mouseReverse(40).x,
                            y: mouseReverse(40).y
                        } }
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
                            {filterData?.length !== 0 && filterData?.map(({attributes,id}) => (
                                <div key={attributes.id} className="col-12">
                                    <div className="edu-event-list event-list-2">
                                        <EventListItem item={attributes} id={id} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <ul className="edu-pagination top-space-30 justify-content-start">
                    <li>
                        <a href="#" aria-label="Previous">
                            <i className="icon-west"></i>
                        </a>
                    </li>
                    <li className="active">
                        <a href="#">1</a>
                    </li>
                    <li>
                        <a href="#">2</a>
                    </li>
                    <li>
                        <a href="#">3</a>
                    </li>
                    <li className="more-next">
                        <a href="#"></a>
                    </li>
                    <li>
                        <a href="#">8</a>
                    </li>
                    <li>
                        <a href="#" aria-label="Next">
                            <i className="icon-east"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        </div>
    )
}

export default EventListArea;