import * as React from 'react';
import LessonHero from '../../Component/modules/views/LessonHero';
import { LessonSmokingHero } from '../../Component/modules/views/LessonSmokingHero';
import withRoot from '../../Component/modules/withRoot';
import { LessonCTA } from '../../Component/modules/views/LessonCTA';
import WhyChose from '../../Component/WhoIsUjuzi/AboutUjuzi/why-chose';
import AdBanner from '../../Component/modules/components/Ad-banner';
import VideoTestimonial from '../../Component/Testimonials/VideoTestimonial';
import CounterStatistics from '../../Component/Counter/CounterStatistics';
// import AboutUsArea from '../../Component/WhoIsUjuzi/AboutUjuzi/about-us-area';
// import PartnerSlider from '../../Component/WhoIsUjuzi/AboutUjuzi/PartnersArea/PartnerSlider';

function Index() {

  return (
    <React.Fragment>
      <LessonHero/>
      <WhyChose />
     {/* <AboutUsArea />  */}
     <CounterStatistics/>
      <AdBanner/>
      {/* <OurPartners/> */}
      {/* <LessonHowItWorks /> */}
      <VideoTestimonial/>
      <LessonCTA/>
      <LessonSmokingHero />
    
    </React.Fragment>
  );
}

export default withRoot(Index);
