import * as React from 'react';
import LessonValues from '../../Component/modules/views/LessonValues';
import LessonHero from '../../Component/modules/views/LessonHero';
import LessonsCategories from '../../Component/modules/views/LessonsCategories';
import LessonHowItWorks from '../../Component/modules/views/LessonHowItWorks';
import { LessonSmokingHero } from '../../Component/modules/views/LessonSmokingHero';
import withRoot from '../../Component/modules/withRoot';
import { LessonCTA } from '../../Component/modules/views/LessonCTA';

function Index() {

  return (
    <React.Fragment>
      <LessonHero/>
      <LessonValues />
      <LessonsCategories />
      <LessonHowItWorks />
      <LessonCTA/>
      <LessonSmokingHero />
    
    </React.Fragment>
  );
}

export default withRoot(Index);
