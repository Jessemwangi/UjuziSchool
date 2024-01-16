import React from 'react';

const ContactMap = () => {
    return (
        <div className="google-map-area">
            <div className="mapouter">
                <div className="gmap_canvas">
                <iframe
  id="gmap_canvas"
  title="Ujuzi Location"
  src="https://maps.google.com/maps?q=Simonkyl%C3%A4ntie%2011%20B%209,%2001390%20Vantaa&t=&z=15&ie=UTF8&iwloc=&output=embed"
  frameborder="0"
  marginheight="0"
  marginwidth="0"
  loading="lazy"
></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactMap;

