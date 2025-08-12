import React, { useEffect, useState } from "react";
import { Typography, Grid, Pagination, CircularProgress, Alert, Button } from "@mui/material";
import Chart from "react-apexcharts";
import '../../admin.scss';
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate, useOutletContext } from "react-router-dom";

const AgentDashboard = () => {
  const [page, setPage] = useState(1);
  const [agentFetchUrl, setAgentFetchUrl] = useState(null);
  const [subscriptionFetchUrl, setSubscriptionFetchUrl] = useState(null);
  const { user } = useOutletContext();
const navigate = useNavigate();

  // First fetch: Get agent details using user ID
  useEffect(() => {
    if (user?.id) {
      setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
    }
  }, [user]);

  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);

  // Second fetch: Get agent subscriptions using agent ID
  useEffect(() => {
    if (agentData?.data?.[0]?.id) {
      setSubscriptionFetchUrl(`/agents/subscriptions/${agentData.data[0].id}?page=${page}`);
    }
  }, [agentData, page]);

  const { data: subscriptionData, loading: subscriptionLoading, error: subscriptionError } = useFetch(subscriptionFetchUrl);

  console.log('Agent data:', agentData, 'Subscription data:', subscriptionData);

  // Show loading if user is not available
  if (!user) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  // Show loading while fetching agent data
  if (agentLoading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }

  // Handle agent fetch error
  if (agentError) {
    const errorMessage = agentError?.response?.data?.error?.message || agentError.message || 'Something went wrong';
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{errorMessage}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Check if user is not an agent
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

  const agent = agentData.data[0];

  // Show loading while fetching subscription data
  if (subscriptionLoading) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Typography variant="h4" gutterBottom>Agent Dashboard</Typography>
          <CircularProgress />
        </div>
      </div>
    );
  }

  // Handle subscription fetch error
  if (subscriptionError) {
    const errorMessage = subscriptionError?.response?.data?.error?.message || subscriptionError.message || 'Failed to load subscription data';
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

  // You can now use both agent and subscriptionData
  console.log('Agent:', agent);
  console.log('Subscription Data:', subscriptionData);

  // Chart configurations
  const studentsChartOptions = {
    chart: { 
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    dataLabels: { enabled: true },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { 
      categories: ['Active Students', 'Inactive Students'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { title: { text: 'Number of Students' } },
    fill: { opacity: 1 },
    colors: ['#2E93fA', '#FF6B6B'],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " students"
        }
      }
    }
  };

  const studentsChartSeries = [{
    name: 'Students',
    data: [subscriptionData?.totalActiveStudents || 0, subscriptionData?.totalNonActiveStudents || 0]
  }];

  const subscriptionChartOptions = {
    chart: { 
      type: 'donut',
      toolbar: { show: false }
    },
    labels: ['Active Subscriptions', 'Total Capacity'],
    colors: ['#00D4AA', '#E8F5E8'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function () {
                return subscriptionData?.totalSubscriptions || 0
              }
            }
          }
        }
      }
    },
    dataLabels: { enabled: true },
    legend: { position: 'bottom' }
  };

  const subscriptionChartSeries = [
    subscriptionData?.totalSubscriptions || 0,
    (subscriptionData?.totalMaxUsersAcrossPackages || 0) - (subscriptionData?.totalSubscriptions || 0)
  ];

  return (
    <div className="adminMain">
      <div className="main-content">
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
          Agent Dashboard
        </Typography>
        
        {/* Agent Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {subscriptionData?.totalSubscriptions || 0}
              </Typography>
              <Typography variant="body2">Total Subscriptions</Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {subscriptionData?.totalStudentsAcrossAllSubscriptions || 0}
              </Typography>
              <Typography variant="body2">Total Students</Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {subscriptionData?.totalActiveStudents || 0}
              </Typography>
              <Typography variant="body2">Active Students</Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <div style={{ 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
              padding: '20px', 
              borderRadius: '12px', 
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {subscriptionData?.totalMaxUsersAcrossPackages || 0}
              </Typography>
              <Typography variant="body2">Max Capacity</Typography>
            </div>
          </Grid>
        </Grid>

        {/* Agent Info Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Agent Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Agent Number</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{subscriptionData?.agentNumber || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{subscriptionData?.accountInfo?.email || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Engagement Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {subscriptionData?.engagementType || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" color="text.secondary">Member Since</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {subscriptionData?.createdAt ? new Date(subscriptionData.createdAt).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {/* Charts Section */}
        {subscriptionData && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                height: '400px'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Student Activity</Typography>
                <Chart options={studentsChartOptions} series={studentsChartSeries} type="bar" height={320} />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                height: '400px'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Subscription Overview</Typography>
                <Chart options={subscriptionChartOptions} series={subscriptionChartSeries} type="donut" height={320} />
              </div>
            </Grid>
          </Grid>
        )}

        {/* Subscriptions List */}
        {subscriptionData?.subscriptions && (
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Active Subscriptions</Typography>
            <Grid container spacing={2}>
              {subscriptionData.subscriptions.map((subscription, index) => (
                <Grid item xs={12} md={6} key={subscription.id}>
                  <div style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px', 
                    padding: '16px',
                    background: subscription.isActive ? '#f8fff8' : '#fff8f8',
                    borderLeft: `4px solid ${subscription.isActive ? '#4caf50' : '#f44336'}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {subscription.institution}
                      </Typography>
                      <div style={{ 
                        background: subscription.isActive ? '#e8f5e8' : '#ffebee', 
                        color: subscription.isActive ? '#2e7d32' : '#c62828',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {subscription.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </div>
                    </div>
                    
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Registration</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{subscription.regNumber}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Package</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{subscription.packageName}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Students</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {subscription.totalStudentsInPackage}/{subscription.totalMaxUsers}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Contract</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{subscription.contractNumber}</Typography>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="caption" color="text.secondary">
                      {subscription.startDate} to {subscription.endDate}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Contact: {subscription.contactPerson} ({subscription.email})
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {/* Pagination - Note: This assumes your API supports pagination on subscriptions */}
        {subscriptionData?.subscriptions && subscriptionData.subscriptions.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination
              count={Math.ceil((subscriptionData?.totalSubscriptions || 0) / (subscriptionData?.subscriptions?.length || 1))}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="large"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;