import React, { useEffect, useState } from 'react';
import CtaArea from '../../../Component/WhoIsUjuzi/AboutUjuzi/cta-area';
import PriceIntro from './PriceIntro';
import PricingArea from './PricingArea';
import { useFetch } from '../../../hooks/useFetch';

const Pricing = () => {

    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <PriceIntro/>
            <CtaArea/>
              <PricingArea/>
            </div>
        </div>

    )
}

export default Pricing;