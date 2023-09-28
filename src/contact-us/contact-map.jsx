import React from 'react';

const ContactMap = () => {
    return (
        <div className="google-map-area">
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Runeberginkatu%2014-16,%20Helsinki,%20Southern%20Finland,%2000100&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactMap;

