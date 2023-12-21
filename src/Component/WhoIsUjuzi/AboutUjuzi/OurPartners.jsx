import { Link } from "@mui/material";

export const brand_contents = {
  pre_title: "Our Partners",
  title: "Meet our business Partners",
  text: "We thrive on collaborative problem-solving. Partnering with like-minded organizations, we deliver impactful solutions.",
  brands: [
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-01.jpg', year:'24', id:'1', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-01.png", name: "institution 1" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-02.jpg', year:'24', id:'2', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-02.png", name: "institution 2" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-03.jpg', year:'24', id:'3', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-03.png", name: "institution 3" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-04.jpg', year:'24', id:'4', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-04.png", name: "institution 4" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-05.jpg', year:'24', id:'5', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-05.png", name: "institution 1" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-06.jpg', year:'24', id:'6', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-06.png", name: "institution 1" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-07.jpg', year:'24', id:'7', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-07.png", name: "institution 1" },
    { country:'Country Name', dateSigned:'30', month:'Sep', img: 'event-08.jpg', year:'24', id:'8', descrip:'Best learining institution in the application of modern day Stem, Aim at forstering Stem knowledge', logo: "brand-08.png", name: "institution 1" },
  ],
};

const { pre_title, title, text, brands } = brand_contents;

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
