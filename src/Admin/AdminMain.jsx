import {  Alert, CircularProgress, Container,  } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import { useEffect, useState } from 'react';
import Button from '../Component/modules/components/Button';
import { useFetch } from '../hooks/useFetch';
;

const AdminMain = () => {
    const [agentFetchUrl, setAgentFetchUrl] = useState(null);
     const { user, ctxLoading, updateUser } = useUser();
      const navigate = useNavigate();

  useEffect(() => {
    if (ctxLoading === false) {
      if (!user) {
        navigate('/sign-in');
      } else if (user && user.id) {       
        setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
      }
    }
  }, [ctxLoading, navigate, user]);

  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);

  // Update user context with agent ID when agent data is loaded
  useEffect(() => {
    if (agentData?.data?.[0]?.id && user && !user.agentId) {
      updateUser({ ...user, agentId: agentData.data[0].id });
    }
  }, [agentData, user, updateUser]);

  // Show loading while context is loading or while fetching agent data
  if (ctxLoading || agentLoading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  // Handle agent fetch errors
  if (agentError) {
    const errorMessage = agentError?.response?.data?.error?.message || agentError.message || 'Something went wrong';
    
    if (errorMessage === 'Forbidden') {
      return (
        <div className="adminMain">
          <div className="main-content">
            <Alert severity="info" sx={{ marginBottom: '1rem' }}>
              You are not an agent
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => navigate('/member/agent-registration')}
            >
              Register as Agent
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="adminMain">
          <div className="main-content">
            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
              {errorMessage}
            </Alert>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }
  }
const agentDetails = agentData?.data?.[0];
  return (
    <Container className="adminMain" sx={{ paddingTop: '3rem' }}>
      <h4>Welcome Agent {user.username}!</h4>
      {/* Pass only agent data - user is available globally */}
      <Outlet context={{ agentData: agentDetails }} />
    </Container>
  );
};

export default AdminMain;