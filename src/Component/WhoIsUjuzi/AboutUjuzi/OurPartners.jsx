import { Link } from "@mui/material";
import { partner_data } from "../../../Data/partners_data";



const { pre_title, title, text, brands } = partner_data;

const OurPartners = () => {
  return (
    <div className="edu-brand-area brand-area-1 gap-top-equal">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="brand-section-heading">
              <div
                className="section-title section-left"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                <span className="pre-title">{pre_title}</span>
                <h2 className="title">{title}</h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>{text}</p>
                <Link
                  className="edu-btn btn-medium"
                  variant="h6"
                  underline="none"
                  color="inherit"
                  href="/partners"
                  sx={{ textAlign: "center", fontSize: 20 }}
                >
                  {"View all Partners"} <i className="icon-4"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="brand-grid-wrap">
              {brands.map(({ logo, name }, i) => (
                <div key={i} className="brand-grid">
                  <img
                    src={require("../../../images/brand/" + logo)}
                    alt="Brand Logo"
                  />
                  <br />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
