import React from "react";
import { Link } from "react-router-dom";
// import rm from '../../images/cert/';
const CertCardsDisplay = ({ data, classes }) => {
  // handle add to cart

  return (
    <div className={`edu-course course-style-5 ${classes ? classes : ""}`}>
      <div className="inner">
        <div className="thumbnail">
          <Link to={data.download_url} target="_blank">
            <img
              src={require(`../../images/cert/${data.img}`)}
              alt="Course Meta"
            />
          </Link>
        </div>
        <div className="content">
          <div className="course-price price-round">
            <img
              className="certImg"
              src={require(`../../images/cert/${data.download_icon}`)}
              alt="download file"
            />{" "}
          </div>
          <span className="course-level">{data.level}</span>
          <h5 className="title">
            <Link to={data.download_url} target="_blank">
              {data.title}
            </Link>
          </h5>
          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
          </div>
          <p>{data.short_desc}</p>
          <ul className="course-meta">
            <li>
              <i className="icon-facebook"></i> FaceBook
            </li>
            <li>
              <i className="icon-linkedin2"></i>LinkedIn
            </li>
          </ul>
        </div>
      </div>

      <div className="hover-content-aside">
        <div className="content">
          <span className="course-level">{data.level}</span>
          <h5 className="title">
            <Link to={data.download_url} target="_blank">
              {data.title}
            </Link>
          </h5>
          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
          </div>
          <ul className="course-meta">
            <li>{data.awarder_on}</li>
          </ul>
          <div className="course-feature">
            <h6 className="title">What we achieved?</h6>
            <ul>
              {data.features.slice(0, 3).map((feature, featurekey) => (
                <li key={featurekey}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="button-group">
            <Link
              className="edu-btn btn-medium"
              style={{ cursor: "pointer" }}
              to={`/viewcert?url=${data.download_url}&title=${data.title}`}
              target="_blank"
            >
              Download / View
              <i className="icon-4"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertCardsDisplay;
