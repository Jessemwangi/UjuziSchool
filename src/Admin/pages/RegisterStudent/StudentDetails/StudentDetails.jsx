import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Alert, 
  CircularProgress, 
  Box, 
  Paper,
  Chip,
  Container
} from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { School, Person } from "@mui/icons-material";
import { useFetch } from "../../../../hooks/useFetch";
import { timeformat } from "../../../../UtilitiesFunctions/formatTime";
import Button from "../../../../Component/modules/components/Button";
import StudentDataTable from "../../../Componets/StudentDataTable ";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [url,setUrl] =useState(null);
   const [refreshKey, setRefreshKey] = useState(0); 
const {agentData} = useOutletContext();

   useEffect(
    () => {
      if (agentData || agentData.id) {
        setUrl(`/student/agentstudentlist/${agentData.id}?refresh=${refreshKey}`)
      }
    }, [refreshKey, agentData]
   )
  const { data, error, loading } = useFetch(url);
    const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Loading state
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading student data...
        </Typography>
      </Box>
    );
  }

  // Error handling
  if (error) {
const errorMessage = error?.response?.data?.error?.message || error?.response?.data?.error?.name  || error.message || 'Something went wrong';
    const statusCode = error?.response?.status || error?.status || 500;

    return (
      <Container maxWidth="md">
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Alert 
            severity={errorMessage === "ForbiddenError" || statusCode === 403 || errorMessage === 'Forbidden access' ? "info" : "error"} 
            sx={{ mb: 3 }}
          >
            {errorMessage === "ForbiddenError" || statusCode === 403 || errorMessage === 'Forbidden access'
              ? "You don't have permission to access student data."
              : errorMessage
            }
          </Alert>
          
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/member/admin')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Transform data
const convertedData = data?.filter(item => !item.student_user.isDeleted)
  .map(item => ({
    id: item.student_user.id,
    studentName: item.student_user.studentName,
    dateRegistered: timeformat(item.student_user.createdAt),
    studyLevel: item.student_user.studyLevel,
    isBlocked: item.student_user.isBlocked,
    isDeleted: item.student_user.isDeleted,
  }));

  const studentCount = convertedData?.length || 0;

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          {/* Title and Icon */}
          <Box display="flex" alignItems="center" gap={2}>
            <School sx={{ fontSize: 32, color: 'primary.main' }} />
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  mb: 0.5
                }}
              >
                Student Management
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Manage and view your registered students
              </Typography>
            </Box>
          </Box>

          {/* Student Count */}
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Students
            </Typography>
            <Chip
              icon={<Person />}
              label={`${studentCount} Student${studentCount !== 1 ? 's' : ''}`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Content Section */}
      {convertedData && convertedData.length > 0 ? (
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <StudentDataTable 
          data={convertedData}
           onRefresh={handleRefresh} />
        </Paper>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <School sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No Students Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
            You haven't registered any students yet. Start by adding your first student to begin managing their learning journey.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/member/admin/student')}
            startIcon={<Person />}
          >
            Register New Student
          </Button>
        </Paper>
      )}

      {/* Quick Actions */}
      {studentCount > 0 && (
        <Box mt={3} mb={5} border={"red"} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            onClick={() => navigate('/member/admin/student')}
            startIcon={<Person />}
          >
            Add New Student
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default StudentDetails;