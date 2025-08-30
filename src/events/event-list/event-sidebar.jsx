import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add_category, add_date_filter, add_city } from '../../redux/features/event-slice';

const EventSidebar = ({events}) => {
    const all_categories = [...new Set(events?.map(event => event?.category))];
    
    // Extract unique cities from event_meta
    const all_cities = [...new Set(events?.map(event => {
        const eventMeta = event?.event_meta || '';
        // Extract country/city names - looking for common patterns
        const cityPatterns = [
            'Japan', 'New York', 'England', 'Moscow', 'Paris', 'Helsinki', 
            'Finland', 'London', 'Berlin', 'Germany', 'France', 'Italy',
            'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark'
        ];
        
        const foundCity = cityPatterns.find(city => 
            eventMeta.toLowerCase().includes(city.toLowerCase())
        );
        return foundCity;
    }).filter(Boolean))]; // Remove undefined values

    const { categories, dateFilters, cities } = useSelector(state => state.event);
    const dispatch = useDispatch();

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

    // Handle category filter
    const handleCategory = (cate) => {
        const index = categories.findIndex(item => item === cate);
        if (index >= 0) {
            dispatch(add_category({changeType: 'remove', item: cate}));
        } else {
            dispatch(add_category({changeType: 'added', item: cate}));
        }
    };

    // Handle date filter
    const handleDateFilter = (dateType) => {
        const index = dateFilters.findIndex(item => item === dateType);
        if (index >= 0) {
            dispatch(add_date_filter({changeType: 'remove', item: dateType}));
        } else {
            dispatch(add_date_filter({changeType: 'added', item: dateType}));
        }
    };

    // Handle city filter
    const handleCityFilter = (city) => {
        const index = cities.findIndex(item => item === city);
        if (index >= 0) {
            dispatch(add_city({changeType: 'remove', item: city}));
        } else {
            dispatch(add_city({changeType: 'added', item: city}));
        }
    };

    return (
        <div className="course-sidebar-2">
            {/* Categories Filter */}
            <div className="edu-course-widget widget-category">
                <div className="inner">
                    <h5 className="widget-title">Categories</h5>
                    <div className="content">
                        {all_categories.map((c, i) => (
                            <div key={i} className="edu-form-check">
                                <input 
                                    onChange={() => handleCategory(c)} 
                                    type="checkbox" 
                                    id={`cat-check${i + 1}`}
                                    checked={categories.includes(c)}
                                />
                                <label htmlFor={`cat-check${i + 1}`}>{c}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Date Filter */}
            <div className="edu-course-widget widget-date-filter">
                <div className="inner">
                    <h5 className="widget-title">Date</h5>
                    <div className="content">
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="date-check1"
                                onChange={() => handleDateFilter('any_day')}
                                checked={dateFilters.includes('any_day')}
                            />
                            <label htmlFor="date-check1">Any Day</label>
                        </div>
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="date-check2"
                                onChange={() => handleDateFilter('today')}
                                checked={dateFilters.includes('today')}
                            />
                            <label htmlFor="date-check2">Today</label>
                        </div>
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="date-check3"
                                onChange={() => handleDateFilter('tomorrow')}
                                checked={dateFilters.includes('tomorrow')}
                            />
                            <label htmlFor="date-check3">Tomorrow</label>
                        </div>
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="date-check4"
                                onChange={() => handleDateFilter('this_week')}
                                checked={dateFilters.includes('this_week')}
                            />
                            <label htmlFor="date-check4">This Week</label>
                        </div>
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="date-check5"
                                onChange={() => handleDateFilter('this_month')}
                                checked={dateFilters.includes('this_month')}
                            />
                            <label htmlFor="date-check5">This Month</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cities Filter */}
            <div className="edu-course-widget widget-cities">
                <div className="inner">
                    <h5 className="widget-title">Cities</h5>
                    <div className="content">
                        <div className="edu-form-check">
                            <input 
                                type="checkbox" 
                                id="city-check-all"
                                onClick={() => handleCityFilter('all_cities')}
                                checked={cities.includes('all_cities')}
                            />
                            <label htmlFor="city-check-all">All Cities</label>
                        </div>
                        {all_cities.map((city, i) => (
                            <div key={i} className="edu-form-check">
                                <input 
                                    type="checkbox" 
                                    id={`city-check${i + 1}`}
                                    onClick={() => handleCityFilter(city)}
                                    checked={cities.includes(city)}
                                />
                                <label htmlFor={`city-check${i + 1}`}>{city}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventSidebar;