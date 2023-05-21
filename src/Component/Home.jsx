import * as React from 'react';
import LessonsCategories from './modules/views/LessonsCategories';
import ProductSmokingHero from './modules/views/LessonSmokingHero';
import ProductValues from './modules/views/LessonValues';
import LessonHowItWorks from './modules/views/LessonHowItWorks';
import ProductCTA from './modules/views/LessonCTA';
import withRoot from './modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      {/* <ProductValues />
      <LessonsCategories />
      <LessonHowItWorks />
      <ProductCTA />
      <ProductSmokingHero /> */}
    </React.Fragment>
  );
}

export default withRoot(Index);
