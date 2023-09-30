import * as React from 'react';
// import LessonValues from '../../Component/modules/views/LessonValues';
import LessonHero from '../../Component/modules/views/LessonHero';
import OurTeamInfo from '../../Component/team-member/team-details/OurTeamInfo';
import LessonHowItWorks from '../../Component/modules/views/LessonHowItWorks';
import { LessonSmokingHero } from '../../Component/modules/views/LessonSmokingHero';
import withRoot from '../../Component/modules/withRoot';
import { LessonCTA } from '../../Component/modules/views/LessonCTA';
import WhyChose from '../../Component/WhoIsUjuzi/AboutUjuzi/why-chose';
import AboutUsArea from '../../Component/WhoIsUjuzi/AboutUjuzi/about-us-area';
// import BrandArea from '../../layout/footers/component/brand-area';
//  import BrandArea from '../home-modern-schooling/brand-area';
// import FaqArea from '../home-modern-schooling/faq-area';

function Index() {

  return (
    <React.Fragment>
      <LessonHero/>
      <WhyChose />
      <AboutUsArea />
      {/* <LessonValues /> */}
      {/* <BrandArea/> */}
      {/* <FaqArea/> */}
      {/* <OurTeamInfo /> */}
      <LessonHowItWorks />
      <LessonCTA/>
      <LessonSmokingHero />
    
    </React.Fragment>
  );
}

export default withRoot(Index);
