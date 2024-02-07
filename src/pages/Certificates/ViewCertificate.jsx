import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ViewCertificate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  const embedUrl = queryParams.get("url");

  const iframeRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (iframeRef.current) {
        iframeRef.current.style.height = window.innerHeight + 'px';
      }
      
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.oncontextmenu = () => false;
    }
  }, []);
  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
    <div className="container">
      <iframe
       ref={iframeRef}
        title={title}
        src={embedUrl}
        width="100%"
        allowFullScreen
        oncontextmenu="return false"
      ></iframe>
    </div>
    </div>
  );
};

export default ViewCertificate;
