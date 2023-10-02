import React from 'react';
import { brand_contents } from '../OurPartners';
import AllPartners from './AllPartners';

const PartnersPage = () => {
    const {  brands } = brand_contents;
    return (
        <div className="edu-event-area event-area-1 section-gap-equal">
            <div className="container">
                <div data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <div className="row g-5">
                        <AllPartners itemsPerPage={6} items={brands} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnersPage;