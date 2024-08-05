import React from "react";
// import CounterArea from "./counter-area";
import AboutUsArea from "./about-us-area";
// import TestimonialArea from "./testimonial-area";
import WhyChose from "./why-chose";
import CtaArea from "./cta-area";
import TeamArea from "./team-area";
import TestimonialArea from "../../Testimonials/testimonial-area";

const About = () => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <WhyChose />
        <AboutUsArea />
        {/* <CounterArea about_p_3={true} /> */}
        <CtaArea />
        <TeamArea about_p_3={true} />
        <TestimonialArea />
      </div>
    </div>
  );
};

export default About;
