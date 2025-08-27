import {  Alert, Box, Chip, CircularProgress, Container, Paper, Typography,  } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import { useEffect, useState } from 'react';
import Button from '../Component/modules/components/Button';
import { useFetch } from '../hooks/useFetch';
import { CheckCircle, HourglassEmpty, Person } from '@mui/icons-material';
;

const AdminMain = () => {
    const [agentFetchUrl, setAgentFetchUrl] = useState(null);
     const { user, ctxLoading } = useUser();
      const navigate = useNavigate();

  useEffect(() => {
    if (ctxLoading === false) {
      if (!user || !user.id) {
        navigate('/sign-in');
      } else if (user && user.id) {       
        setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
      }
    }
  }, [ctxLoading, navigate, user]);

  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);

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
<Container className="adminMain" sx={{ paddingTop: '2rem' }} maxWidth="xl">
      {/* Agent Header Section */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          {/* Left side - Welcome message */}
          <Box display="flex" alignItems="center" gap={2}>
            <Person sx={{ fontSize: 40, color: '#1976d2' }} />
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  mb: 0.5
                }}
              >
                Welcome, {user.username}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Agent Dashboard: {' '}{agentDetails?.attributes?.agentNumber ? `- # ${agentDetails.attributes.agentNumber}` : ''}
              </Typography>
            </Box>
          </Box>

          {/* Right side - Approval Status */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Account Status
            </Typography>
            <Chip
              icon={agentDetails.attributes?.isApproved ? <CheckCircle /> : <HourglassEmpty />}
              label={agentDetails.attributes?.isApproved ? 'Approved' : 'Pending Approval'}
              color={agentDetails.attributes?.isApproved ? 'success' : 'warning'}
              variant={agentDetails.attributes?.isApproved ? 'filled' : 'outlined'}
              sx={{ 
                fontWeight: 'bold',
                fontSize: '0.875rem',
                px: 2,
                py: 0.5
              }}
            />
          </Box>
        </Box>

        {/* Conditional message for pending approval */}
        {!agentDetails.attributes?.isApproved && (
          <Alert 
            severity="info" 
            sx={{ 
              mt: 3, 
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '0.875rem'
              }
            }}
          >
            <Typography variant="body2">
              <strong>Your agent application is being reviewed.</strong> Some features may be limited until approval is complete. 
              You'll receive an email notification once your account is approved.
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* Main Content Area */}
      <Outlet context={{ agentData: agentDetails }} />
    </Container>
  );
};

export default AdminMain;