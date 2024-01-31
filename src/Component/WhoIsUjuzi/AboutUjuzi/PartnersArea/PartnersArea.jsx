import React from 'react';
import Attribute from './Attribute';
import PartnersPage from './PartnersPage';

const PartnersArea = () => {
    return (
        <section className="section-gap-equal">
            <div className="container">
            
            <PartnersPage/>
            <Attribute/>
            </div>
        </section>
    );
};

export default PartnersArea;