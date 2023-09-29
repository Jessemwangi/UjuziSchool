import React from "react";
import CounterArea from "./counter-area";
import AboutUsArea from "./about-us-area";
import TestimonialArea from "./testimonial-area";
import WhyChose from "./why-chose";
import HeaderTwo from "../../../layout/headers/header-2";
import Footer from "../../../layout/footers/footer";
import CtaArea from "./cta-area";
import TeamArea from "./team-area";
import BreadcrumbTwo from "./breadcrumb-2";

const About = () => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        {/* <HeaderTwo style_3={true} no_topBar={true} />
                <BreadcrumbTwo subtitle="About Us 03" /> */}
        <WhyChose />
        <AboutUsArea />
        <CounterArea about_p_3={true} />
        <CtaArea />
        <TeamArea about_p_3={true} />
        <TestimonialArea />
        <Footer style_2={"footer-dark bg-image footer-style-2"} />
      </div>
    </div>
  );
};

export default About;
