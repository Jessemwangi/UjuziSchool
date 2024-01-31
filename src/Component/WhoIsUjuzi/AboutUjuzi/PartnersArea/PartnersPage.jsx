import React from 'react';
// import { brand_contents } from '../OurPartners';
import AllPartners from './AllPartners';
import Typography from '../../../modules/components/Typography';
import { partner_data } from '../../../../Data/partners_data';

const PartnersPage = () => {
   
    return (
       <div className="container">
                    <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14, fontSize:"36px" }}>
          OUR PARTNERS
        </Typography>
                <div data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                    <div className="row g-5">
                        <AllPartners itemsPerPage={6} items={partner_data.brands} />
                    </div>
                </div>
            </div>

    );
};

export default PartnersPage;