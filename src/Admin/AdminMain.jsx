import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import { useEffect, useState } from 'react';
import Button from '../Component/modules/components/Button';
import { useFetch } from '../hooks/useFetch';
import { 
  CheckCircle, 
  HourglassEmpty, 
  Person, 
  Cancel, 
  Warning 
} from '@mui/icons-material';

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
 if (agentError || (agentData?.data?.length === 0)) {
    const errorMessage = agentError?.response?.data?.error?.message || agentError?.response?.data?.error?.name  || agentError.message || 'Something went wrong';
    const statusCode = agentError?.response?.status || agentError?.status || 500;
    if (errorMessage === 'Forbidden' || statusCode === 403 || (agentData?.data?.length === 0)) {
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
  const isActive = agentDetails?.isActive;
  const isApproved = agentDetails?.isApproved;
  // Determine overall status
  const getAccountStatus = () => {
    if (isActive && isApproved) {
      return {
        status: 'fully_active',
        label: 'Fully Active',
        color: 'success',
        severity: 'success',
        message: 'Your account is active and approved! You have full access to all agent features.'
      };
    } else if (!isActive && !isApproved) {
      return {
        status: 'inactive_unapproved',
        label: 'Inactive & Pending',
        color: 'error',
        severity: 'warning',
        message: 'Your account is inactive and pending approval. Most features are limited until both conditions are met.'
      };
    } else if (isActive && !isApproved) {
      return {
        status: 'active_unapproved',
        label: 'Active but Pending Approval',
        color: 'warning',
        severity: 'info',
        message: 'Your account is active but pending approval. Some features may be limited until approval is complete.'
      };
    } else if (!isActive && isApproved) {
      return {
        status: 'inactive_approved',
        label: 'Approved but Inactive',
        color: 'warning',
        severity: 'warning',
        message: 'Your account is approved but inactive. Please contact support to activate your account.'
      };
    }
  };

  const accountStatus = getAccountStatus();
  const canAccessFeatures = isActive && isApproved;

  return (
    <Container className="adminMain" sx={{ paddingTop: '2rem' }} maxWidth="xl">
      {/* Agent Header Section */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: canAccessFeatures 
            ? 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)'
            : 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)'
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
                Agent Dashboard
                {agentDetails?.agentNumber && ` - #${agentDetails.agentNumber}`}
              </Typography>
            </Box>
          </Box>

          {/* Right side - Status */}
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Account Status
            </Typography>
            
            {/* Overall Status Chip */}
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Chip
                icon={canAccessFeatures ? <CheckCircle /> : <Warning />}
                label={accountStatus.label}
                color={accountStatus.color}
                variant="filled"
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  px: 2,
                  py: 0.5
                }}
              />
            </Box>

            {/* Individual Status Chips */}
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                icon={isActive ? <CheckCircle /> : <Cancel />}
                label={isActive ? 'Active' : 'Inactive'}
                color={isActive ? 'success' : 'error'}
                variant="outlined"
                size="small"
                sx={{ 
                  fontWeight: 'medium',
                  fontSize: '0.75rem'
                }}
              />
              <Chip
                icon={isApproved ? <CheckCircle /> : <HourglassEmpty />}
                label={isApproved ? 'Approved' : 'Pending'}
                color={isApproved ? 'success' : 'warning'}
                variant="outlined"
                size="small"
                sx={{ 
                  fontWeight: 'medium',
                  fontSize: '0.75rem'
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Status Message */}
        <Alert 
          severity={accountStatus.severity}
          sx={{ 
            mt: 3, 
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: '0.875rem'
            }
          }}
        >
          <Typography variant="body2">
            <strong>{accountStatus.message}</strong>
            {!canAccessFeatures && " You'll receive an email notification once your account is fully activated."}
          </Typography>
        </Alert>
      </Paper>

      {/* Main Content Area - Only show if can access features */}
      {canAccessFeatures ? (
        <Outlet context={{ agentData: agentDetails }} />
      ) : (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <HourglassEmpty sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography variant="h6" color="text.secondary">
              Feature Access Limited
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
              Complete agent features will be available once your account is both active and approved.
            </Typography>
            {!isActive && (
              <Button 
                variant="outlined" 
                onClick={() => {navigate('/member/contact-admin')}}
                sx={{ mt: 2 }}
              >
                Contact Support
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default AdminMain;