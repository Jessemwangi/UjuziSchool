import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Chip,
  Paper,
  Stack,
  Icon,
  Alert,
} from '@mui/material';
import {
  Apartment,
  People,
  School,
  DateRange,
  ArrowForward,
  Inbox,
} from '@mui/icons-material';
import {  ThemeProvider } from '@mui/material/styles';
import { useFetch } from '../../../hooks/useFetch';
import { lightTheme } from '../pricing-table/singlePrice/CoursePreview';
import { useUser } from '../../../hooks/UserContext';

// A small component for the dashboard summary cards
const DashboardStatCard = ({ title, value, icon, color }) => (
    <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon component={icon} sx={{ fontSize: 40, color: color || 'primary.main' }} />
        <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{value}</Typography>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
    </Paper>
);


const AgentSubscriptions = () => {
    const [page] = useState(1); // For pagination if needed in the future
    const [agentFetchUrl, setAgentFetchUrl] = useState(null);
    const [subscriptionFetchUrl, setSubscriptionFetchUrl] = useState(null);
     const { user } = useUser();
const navigate = useNavigate();
  // --- Data Fetching Logic ---

  useEffect(() => {
    if (user?.id) {
      setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
    }
  }, [user]);

  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);

  // Second fetch: Get agent subscriptions using the fetched agent ID
  useEffect(() => {
    if (agentData?.data?.[0]?.id) {
      setSubscriptionFetchUrl(`/agents/subscriptions/${agentData.data[0].id}?page=${page}`);
    }
  }, [agentData, page]);

  const { data: subscriptionData, loading: subscriptionLoading, error: subscriptionError } = useFetch(subscriptionFetchUrl);
  
  if (!user) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  // --- UI Rendering Logic ---
  const renderState = (title, message, icon) => (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 3 }}>
      <Paper sx={{ textAlign: 'center', p: 6, maxWidth: '450px' }}>
        {icon}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography color="text.secondary">{message}</Typography>
      </Paper>
    </Box>
  );

  const isLoading = agentLoading || subscriptionLoading;

  if (isLoading && !subscriptionData) {
    return renderState('Loading Subscriptions...', 'Please wait while we fetch your data.', 
    <div className="adminMain">
        <div className="main-content">
          <CircularProgress size={48} />
        </div>
      </div>);
  }

  if (agentError) {
    const errorMessage = agentError?.response?.data?.error?.message || agentError.message || 'Something went wrong';
    if (errorMessage === 'Forbidden') {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>You are not an agent</Alert>
          <Button variant="contained" onClick={() => navigate('/member/agent-registration')}>Register as Agent</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{errorMessage}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }
}
  
if (subscriptionError) {
  const errorMessage = subscriptionError?.response?.data?.error?.message || subscriptionError.message || 'Failed to load subscription data';
  if (errorMessage === 'Forbidden') {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>You are not an agent</Alert>
          <Button variant="contained" onClick={() => navigate('/member/agent-registration')}>Register as Agent</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Typography variant="h4" gutterBottom>Agent Dashboard</Typography>
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{errorMessage}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }
}

  if (!agentData?.data?.length) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>You are not an agent</Alert>
          <Button variant="contained" onClick={() => navigate('/member/agent-registration')}>Register as Agent</Button>
        </div>
      </div>
    );
  }

  if (!subscriptionData || !subscriptionData.subscriptions || subscriptionData.subscriptions.length === 0) {
    return renderState('No Subscriptions Found', 'It looks like you don’t have any active subscriptions yet.', 
    <Inbox color="primary" sx={{ fontSize: 48 }} />);
  }

  const { subscriptions, ...summary } = subscriptionData;

  return (
    <ThemeProvider theme={lightTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Agent Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back! Here's a summary of your subscriptions.
          </Typography>

          {/* --- Dashboard Summary Section --- */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={4}>
                <DashboardStatCard title="Total Subscriptions" value={summary.totalSubscriptions} icon={Apartment} color="primary.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <DashboardStatCard title="Total Students" value={summary.totalStudentsAcrossAllSubscriptions} icon={People} color="#f59e0b" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <DashboardStatCard title="Active Students" value={summary.totalActiveStudents} icon={School} color="#10b981" />
            </Grid>
          </Grid>

          {/* --- Subscriptions List --- */}
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Your Subscriptions ({subscriptions.length})
          </Typography>
          <Grid container spacing={4}>
            {subscriptions.map((sub) => (
              <Grid item xs={12} md={6} lg={4} key={sub.id}>
                <Card>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3">{sub.institution}</Typography>
                      <Chip 
                        label={sub.isActive ? 'Active' : 'Inactive'}
                        color={sub.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {sub.regNumber}
                    </Typography>
                    
                    <Chip label={sub.packageName} color="secondary" variant="outlined" sx={{ my: 2, fontWeight: 600 }} />

                    <Stack spacing={1.5} mt={2}>
                        <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                            <DateRange fontSize="small" />
                            <Typography variant="body2">
                                {new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                            <People fontSize="small" />
                            <Typography variant="body2">
                                {sub.totalStudentsInPackage} Students / {sub.totalMaxUsers} Max
                            </Typography>
                        </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      component={Link}
                      to={`/member/admin/package/${sub.packageId}`}
                      variant="contained" 
                      fullWidth
                      endIcon={<ArrowForward />}
                    >
                      View Package
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AgentSubscriptions;
