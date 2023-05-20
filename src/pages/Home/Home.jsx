import * as React from 'react';
import AppAppBar from '../../Component/modules/views/AppAppBar';
import LessonValues from '../../Component/modules/views/LessonValues';
import LessonHero from '../../Component/modules/views/LessonHero';
import LessonsCategories from '../../Component/modules/views/LessonsCategories';
import LessonHowItWorks from '../../Component/modules/views/LessonHowItWorks';
import { LessonSmokingHero } from '../../Component/modules/views/LessonSmokingHero';
import AppFooter from '../../Component/modules/views/AppFooter';
import withRoot from '../../Component/modules/withRoot';
import { LessonCTA } from '../../Component/modules/views/LessonCTA';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <LessonHero/>
      <LessonValues />
      <LessonsCategories />
      <LessonHowItWorks />
      <LessonCTA/>
      <LessonSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
