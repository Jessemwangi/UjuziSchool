import React from 'react';
const images = [
    'images/brand/brand-01.png',
    'images/brand/brand-02.png',
    'images/brand/brand-03.png',
    'images/brand/brand-04.png',
    'images/brand/brand-05.png',
    'images/brand/brand-06.png'
];

const BrandArea = () => {
    const homeurl ='../../../'
    return (
        <div className="edu-brand-area brand-area-6">
            <div className="container">
                <div className="brand-grid-wrap brand-style-2">
                    {images.map((img, i) => (
                        <div key={i} className="brand-grid">
                            <img src={require('../../../' + img)} alt="Brand Logo" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BrandArea;