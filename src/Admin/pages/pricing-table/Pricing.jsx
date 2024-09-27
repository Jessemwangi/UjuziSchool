import React from 'react';
import CtaArea from '../../../Component/WhoIsUjuzi/AboutUjuzi/cta-area';
import PriceIntro from './PriceIntro';
import PricingArea from './PricingArea';

const Pricing = () => {

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <PriceIntro/>
              <PricingArea/>
            <CtaArea/>
            </div>
        </div>

    )
}

export default Pricing;