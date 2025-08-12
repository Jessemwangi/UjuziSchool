import {  CircularProgress, Container,  } from '@mui/material';
import { Outlet, useOutletContext } from 'react-router-dom';
;

const AdminMain = () => {
    const { user } = useOutletContext();
      if (!user) {
        return (
          <div className="adminMain">
            <div className="main-content">
              <CircularProgress />
            </div>
          </div>
        );
      }
  return (
    <Container className="adminMain" sx={{ paddingTop: '3rem' }}>
        <h1>Hi wonders {user.username}</h1>
        <Outlet  />
      {/* <AgentDashboard agentId={data.data[0].id} /> */}
    </Container>
  );
};

export default AdminMain;