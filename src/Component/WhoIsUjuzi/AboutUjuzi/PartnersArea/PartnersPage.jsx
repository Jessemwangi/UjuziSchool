import React from 'react';
import { brand_contents } from '../OurPartners';
import AllPartners from './AllPartners';
import Typography from '../../../modules/components/Typography';

const PartnersPage = () => {
    const {  brands } = brand_contents;
    return (
       <div className="container">
                    <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14, fontSize:"36px" }}>
          Ujuzi has successfully partner with :-
        </Typography>
                <div data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <div className="row g-5">
                        <AllPartners itemsPerPage={6} items={brands} />
                    </div>
                </div>
            </div>

    );
};

export default PartnersPage;