import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Autocomplete,
} from '@mui/material';
import {
  ArrowBack,
  PersonAdd,
  PersonRemove,
  Block,
  Close,
  Warning,
} from '@mui/icons-material';
import { useFetch } from '../../../hooks/useFetch';
import { putData, postData } from '../../../UtilitiesFunctions/Function';
import { useUser } from '../../../hooks/UserContext';

const ManageSubscription = () => {
  const { subscriptionId } = useParams(); // This is documentId
  const navigate = useNavigate();
  const { user } = useUser();
  const { agentData } = useOutletContext();
  
  const [subscriptionFetchUrl, setSubscriptionFetchUrl] = useState(null);
  const [availableStudentsFetchUrl, setAvailableStudentsFetchUrl] = useState(null);
  const [enrollmentsFetchUrl, setEnrollmentsFetchUrl] = useState(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openRemoveStudentDialog, setOpenRemoveStudentDialog] = useState(false);
  const [openBlockStudentDialog, setOpenBlockStudentDialog] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [withdrawReason, setWithdrawReason] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch subscription details using documentId
  useEffect(() => {
    if (subscriptionId) {
      setSubscriptionFetchUrl(`/subscriptions/${subscriptionId}?populate[subscription_package][fields][0]=packageName&populate[subscription_package][fields][1]=documentId&populate[subscription_package][fields][2]=totalMaxUsers`);
    }
  }, [subscriptionId]);

  const { data: subscriptionData, loading: subscriptionLoading, error: subscriptionError } = useFetch(subscriptionFetchUrl);
  
  // Get numeric ID from subscription data
  const subscriptionNumericId = subscriptionData?.data?.id;

  // Fetch enrollments using numeric ID
  useEffect(() => {
    if (subscriptionNumericId) {
      setEnrollmentsFetchUrl(`/student-enrollments?filters[subscriptions][id][$eq]=${subscriptionNumericId}&populate[student_users][fields][0]=id&populate[student_users][fields][1]=studentName&populate[student_users][fields][2]=studyLevel&populate[student_users][fields][3]=isBlocked&populate[student_users][fields][4]=isLearning`);
    }
  }, [subscriptionNumericId]);

  const { data: enrollmentsData, loading: enrollmentsLoading, error: enrollmentsError } = useFetch(enrollmentsFetchUrl);

  // Fetch available students with debounce
  useEffect(() => {
    if (agentData?.id && subscriptionNumericId && openAddStudentDialog) {
      console.log('Fetching available students:', {
        agentId: agentData.id,
        subscriptionId: subscriptionNumericId,
        search: studentSearchQuery
      });
      const delayDebounce = setTimeout(() => {
        const searchParam = studentSearchQuery ? `?search=${encodeURIComponent(studentSearchQuery)}` : '';
        const url = `/agent/${agentData.id}/subscription/${subscriptionNumericId}/available-students${searchParam}`;
        console.log('Setting availableStudentsFetchUrl:', url);
        setAvailableStudentsFetchUrl(url);
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      // Reset URL when dialog closes or conditions not met
      setAvailableStudentsFetchUrl(null);
    }
  }, [agentData?.id, subscriptionNumericId, studentSearchQuery, openAddStudentDialog]);

  const { data: availableStudentsData, loading: studentsLoading } = useFetch(availableStudentsFetchUrl);

  // Debug: Log available students data
  useEffect(() => {
    if (availableStudentsData) {
      console.log('Available students data:', availableStudentsData);
      console.log('Students loading:', studentsLoading);
    }
  }, [availableStudentsData, studentsLoading]);

  const handleWithdrawSubscription = async () => {
    if (!withdrawReason.trim()) {
      setError('Please provide a reason for withdrawal');
      return;
    }

    setProcessing(true);
    try {
      await putData(`/subscriptions/${subscriptionId}`, {
        data: {
          isActive: false,
          comment: `Withdrawn: ${withdrawReason}`,
          deactivatedOn: new Date().toISOString(),
        }
      }, user?.jwt);
      
      setSuccess('Subscription withdrawn successfully');
      setOpenWithdrawDialog(false);
      setTimeout(() => navigate('/member/admin/subscriptions'), 2000);
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to withdraw subscription');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudentId) {
      setError('Please select a student');
      return;
    }

    if (!subscriptionNumericId) {
      setError('Subscription ID not available');
      return;
    }

    setProcessing(true);
    try {
      // Create enrollment using custom endpoint
      await postData('/student-enrollments/add-student', {
        studentId: parseInt(selectedStudentId),
        subscriptionId: parseInt(subscriptionNumericId),
        enrolledBy: user?.id,
      }, user?.jwt);
      
      setSuccess('Student added to subscription successfully');
      setOpenAddStudentDialog(false);
      setSelectedStudentId('');
      // Refresh enrollments
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to add student');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveStudent = async (enrollment) => {
    if (enrollment.learningStarted) {
      setError('Cannot remove student who has started learning. Please block them instead.');
      setSelectedStudent(enrollment);
      setOpenRemoveStudentDialog(false);
      setOpenBlockStudentDialog(true);
      return;
    }

    setProcessing(true);
    try {
      await putData(`/student-enrollments/${enrollment.id}`, {
        data: {
          isDeleted: true,
          deletedOn: new Date().toISOString(),
          deletedBy: user?.id,
        }
      }, user?.jwt);
      
      setSuccess('Student removed from subscription successfully');
      setOpenRemoveStudentDialog(false);
      setSelectedStudent(null);
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to remove student');
    } finally {
      setProcessing(false);
    }
  };

  const handleBlockStudent = async () => {
    if (!blockReason.trim()) {
      setError('Please provide a reason for blocking');
      return;
    }

    setProcessing(true);
    try {
      await putData(`/student-enrollments/${selectedStudent.id}`, {
        data: {
          isBlocked: true,
          blockReason: blockReason,
          blockedOn: new Date().toISOString(),
          blockedBy: user?.id,
        }
      }, user?.jwt);
      
      setSuccess('Student blocked successfully');
      setOpenBlockStudentDialog(false);
      setSelectedStudent(null);
      setBlockReason('');
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error?.message || 'Failed to block student');
    } finally {
      setProcessing(false);
    }
  };

  if (subscriptionLoading || enrollmentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (subscriptionError || enrollmentsError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {subscriptionError?.response?.data?.error?.message || enrollmentsError?.response?.data?.error?.message || 'Failed to load data'}
        </Alert>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  const subscription = subscriptionData?.data;
  const enrollments = enrollmentsData?.data || [];
  const availableStudents = availableStudentsData?.data || [];
  const availableStudentsMeta = availableStudentsData?.meta || {};

  // Calculate statistics
  const totalEnrolled = enrollments.length;
  const studentsStartedLearning = enrollments.filter(e => e.learningStarted).length;
  const activeStudents = enrollments.filter(e => e.is_active && !e.isBlocked).length;
  const blockedStudents = enrollments.filter(e => e.isBlocked).length;
  const packageMaxUsers = subscription?.subscription_package?.totalMaxUsers || 0;
  const spotsRemaining = packageMaxUsers > 0 ? packageMaxUsers - totalEnrolled : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/member/admin/subscriptions')}
        sx={{ mb: 3 }}
      >
        Back to Subscriptions
      </Button>

      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h3" fontWeight="bold" color="white">{totalEnrolled}</Typography>
            <Typography variant="body2" color="white">Total Enrolled</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
            <Typography variant="h3" fontWeight="bold" color="white">{studentsStartedLearning}</Typography>
            <Typography variant="body2" color="white">Started Learning</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
            <Typography variant="h3" fontWeight="bold" color="white">{activeStudents}</Typography>
            <Typography variant="body2" color="white">Active Students</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: blockedStudents > 0 ? 'warning.main' : 'grey.300', color: blockedStudents > 0 ? 'white' : 'text.secondary' }}>
            <Typography variant="h3" fontWeight="bold">{blockedStudents}</Typography>
            <Typography variant="body2">Blocked Students</Typography>
          </Paper>
        </Grid>
        {packageMaxUsers > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: spotsRemaining > 0 ? 'secondary.main' : 'error.main', color: 'white' }}>
              <Typography variant="h3" fontWeight="bold" color="white">{spotsRemaining}</Typography>
              <Typography variant="body2" color="white">Spots Remaining</Typography>
            </Paper>
          </Grid>
        )}
        {packageMaxUsers > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', border: '2px solid', borderColor: 'divider' }}>
              <Typography variant="h3" fontWeight="bold">{packageMaxUsers}</Typography>
              <Typography variant="body2" color="text.secondary">Max Capacity</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Subscription Details Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {subscription?.institution}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {subscription?.regNumber}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Chip 
                label={subscription?.isActive ? 'Active' : 'Inactive'}
                color={subscription?.isActive ? 'success' : 'default'}
              />
              <Chip 
                label={subscription?.isApproved ? 'Approved' : 'Pending'}
                color={subscription?.isApproved ? 'primary' : 'warning'}
              />
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">Package</Typography>
              <Typography variant="body1" fontWeight="medium">
                {subscription?.subscription_package?.packageName || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">Duration</Typography>
              <Typography variant="body1" fontWeight="medium">
                {subscription?.startDate && new Date(subscription.startDate).toLocaleDateString()} - {subscription?.endDate && new Date(subscription.endDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">Contact Person</Typography>
              <Typography variant="body1" fontWeight="medium">
                {subscription?.contactPerson}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1" fontWeight="medium">
                {subscription?.email}
              </Typography>
            </Grid>
          </Grid>

          {subscription?.isActive && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Close />}
              onClick={() => setOpenWithdrawDialog(true)}
              sx={{ mt: 3 }}
            >
              Withdraw Subscription
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              Enrolled Students ({enrollments.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => {
                setStudentSearchQuery('');
                setSelectedStudentId('');
                setOpenAddStudentDialog(true);
              }}
              disabled={!subscription?.isActive}
            >
              Add Student
            </Button>
          </Stack>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Study Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Learning Started</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enrollments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary">No students enrolled yet</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  enrollments.map((enrollment) => {
                    // Handle different possible data structures from API
                    const student = enrollment.student_users?.[0];
                    
                    return (
                      <TableRow key={enrollment.id}>
                        <TableCell>{student?.studentName || 'N/A'}</TableCell>
                        <TableCell>{student?.studyLevel || 'N/A'}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Chip 
                              label={enrollment.is_active ? 'Active' : 'Inactive'}
                              size="small"
                              color={enrollment.is_active ? 'success' : 'default'}
                            />
                            {enrollment.isBlocked && (
                              <Chip label="Blocked" size="small" color="error" />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={enrollment.learningStarted ? 'Yes' : 'No'}
                            size="small"
                            color={enrollment.learningStarted ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            {!enrollment.isBlocked && (
                              <Tooltip title="Block Student">
                                <IconButton
                                  size="small"
                                  color="warning"
                                  onClick={() => {
                                    setSelectedStudent(enrollment);
                                    setOpenBlockStudentDialog(true);
                                  }}
                                >
                                  <Block />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title={enrollment.learningStarted ? "Cannot remove - learning started" : "Remove from subscription"}>
                              <span>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    setSelectedStudent(enrollment);
                                    setOpenRemoveStudentDialog(true);
                                  }}
                                  disabled={enrollment.learningStarted}
                                >
                                  <PersonRemove />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Withdraw Dialog */}
      <Dialog open={openWithdrawDialog} onClose={() => setOpenWithdrawDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Withdraw Subscription</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              This will deactivate the subscription. All enrolled students will lose access.
            </Typography>
          </Alert>
          <TextField
            fullWidth
            label="Reason for Withdrawal"
            multiline
            rows={4}
            value={withdrawReason}
            onChange={(e) => setWithdrawReason(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWithdrawDialog(false)} disabled={processing}>
            Cancel
          </Button>
          <Button 
            onClick={handleWithdrawSubscription} 
            color="error" 
            variant="contained"
            disabled={processing || !withdrawReason.trim()}
          >
            {processing ? 'Processing...' : 'Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={openAddStudentDialog} onClose={() => {
        setOpenAddStudentDialog(false);
        setSelectedStudentId('');
        setStudentSearchQuery('');
      }} maxWidth="sm" fullWidth>
        <DialogTitle>Add Student to Subscription</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Autocomplete
              options={availableStudents}
              getOptionLabel={(option) => `${option.studentName} (${option.studyLevel})`}
              value={availableStudents.find(s => s.id === selectedStudentId) || null}
              onChange={(event, newValue) => {
                setSelectedStudentId(newValue?.id || '');
                if (newValue) {
                  setStudentSearchQuery(`${newValue.studentName} (${newValue.studyLevel})`);
                }
              }}
              inputValue={studentSearchQuery}
              onInputChange={(event, newInputValue, reason) => {
                // Only update search query if user is typing, not selecting
                if (reason === 'input') {
                  setStudentSearchQuery(newInputValue);
                } else if (reason === 'clear') {
                  setStudentSearchQuery('');
                  setSelectedStudentId('');
                }
              }}
              loading={studentsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search and Select Student"
                  placeholder="Type student name or study level..."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {studentsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box>
                    <Typography variant="body1">{option.studentName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.studyLevel}
                    </Typography>
                  </Box>
                </li>
              )}
              noOptionsText={
                studentsLoading ? 'Loading...' : 
                studentSearchQuery ? 'No students found matching your search' : 
                'Start typing to search for students'
              }
            />
            {availableStudentsMeta.total !== undefined && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {availableStudentsMeta.total} available student{availableStudentsMeta.total !== 1 ? 's' : ''} 
                ({availableStudentsMeta.enrolledCount || 0} already enrolled)
              </Typography>
            )}
            {!studentsLoading && availableStudents.length === 0 && !studentSearchQuery && (
              <Alert severity="info" sx={{ mt: 2 }}>
                All your students are already enrolled in this subscription or you have no registered students.
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenAddStudentDialog(false);
            setSelectedStudentId('');
            setStudentSearchQuery('');
          }} disabled={processing}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddStudent} 
            variant="contained"
            disabled={processing || !selectedStudentId}
          >
            {processing ? 'Adding...' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Student Dialog */}
      <Dialog open={openRemoveStudentDialog} onClose={() => setOpenRemoveStudentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Remove Student from Subscription</DialogTitle>
        <DialogContent>
          <Alert severity="warning" icon={<Warning />}>
            <Typography variant="body2">
              Are you sure you want to remove <strong>{selectedStudent?.student_users?.[0]?.studentName}</strong> from this subscription?
            </Typography>
            {selectedStudent?.learningStarted && (
              <Typography variant="body2" sx={{ mt: 1 }} color="error">
                This student has started learning and cannot be removed. You can block them instead.
              </Typography>
            )}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveStudentDialog(false)} disabled={processing}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleRemoveStudent(selectedStudent)} 
            color="error" 
            variant="contained"
            disabled={processing || selectedStudent?.learningStarted}
          >
            {processing ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Block Student Dialog */}
      <Dialog open={openBlockStudentDialog} onClose={() => setOpenBlockStudentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Block Student</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Blocking <strong>{selectedStudent?.student_users?.[0]?.studentName}</strong> will prevent them from accessing the learning materials while preserving their progress data.
            </Typography>
          </Alert>
          <TextField
            fullWidth
            label="Reason for Blocking"
            multiline
            rows={4}
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBlockStudentDialog(false)} disabled={processing}>
            Cancel
          </Button>
          <Button 
            onClick={handleBlockStudent} 
            color="warning" 
            variant="contained"
            disabled={processing || !blockReason.trim()}
          >
            {processing ? 'Blocking...' : 'Block Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageSubscription;
