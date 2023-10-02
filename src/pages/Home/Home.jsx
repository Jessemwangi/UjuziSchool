import * as React from 'react';
import LessonHero from '../../Component/modules/views/LessonHero';
import LessonHowItWorks from '../../Component/modules/views/LessonHowItWorks';
import { LessonSmokingHero } from '../../Component/modules/views/LessonSmokingHero';
import withRoot from '../../Component/modules/withRoot';
import { LessonCTA } from '../../Component/modules/views/LessonCTA';
import WhyChose from '../../Component/WhoIsUjuzi/AboutUjuzi/why-chose';
import AboutUsArea from '../../Component/WhoIsUjuzi/AboutUjuzi/about-us-area';
import OurPartners from '../../Component/WhoIsUjuzi/AboutUjuzi/OurPartners';

function Index() {

  return (
    <React.Fragment>
      <LessonHero/>
      <WhyChose />
      <AboutUsArea />
      <OurPartners/>
      <LessonHowItWorks />
      <LessonCTA/>
      <LessonSmokingHero />
    
    </React.Fragment>
  );
}

export default withRoot(Index);
