import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '../../modules/components/Typography';
import { useParams } from 'react-router-dom';
import members from '../../../Data/members';
import TeamArea from './team-area';
import CourseArea from './course-area';

 const OurTeamInfo = () => {
  let { id } = useParams();
  const team = members.find(item => Number(item.id) === Number(id))
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Our Member
      </Typography>
      <TeamArea team={team} />
<CourseArea name={team?.name}/>
    </Container>
  );
}

export default OurTeamInfo;