import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  School as SchoolIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import StudentDataTable from "../../Componets/StudentDataTable ";

const StudentList = () => {
  const navigate = useNavigate();
  const { agentData } = useOutletContext();
  const [studentFetchUrl, setStudentFetchUrl] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch students
  useEffect(() => {
    if (agentData?.id) {
      setStudentFetchUrl(`/student/agentstudentlist/${agentData.id}?refresh=${refreshKey}`);
    }
  }, [agentData, refreshKey]);

  const { data: studentsData, loading: studentsLoading, error: studentsError } = useFetch(studentFetchUrl);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Transform data for the table
  const convertedData = React.useMemo(() => {
    if (!studentsData) return [];
    
    return studentsData
      .filter(item => !item.student_user?.isDeleted)
      .map(item => ({
        id: item.student_user?.id,
        studentName: item.student_user?.studentName,
        dateRegistered: new Date(item.student_user?.createdAt).toLocaleDateString(),
        studyLevel: item.student_user?.studyLevel,
        isBlocked: item.student_user?.isBlocked || false,
        isDeleted: item.student_user?.isDeleted || false,
        blockedReason: item.student_user?.blockedReason || null,
        blockedAt: item.student_user?.blockedAt || null,
      }));
  }, [studentsData]);

  const studentCount = convertedData?.length || 0;

  if (studentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading students...
        </Typography>
      </Box>
    );
  }

  if (studentsError) {
    const errorMessage = studentsError?.response?.data?.error?.message || 
                        studentsError?.response?.data?.error?.name || 
                        studentsError.message || 
                        'Something went wrong';
    const statusCode = studentsError?.response?.status || studentsError?.status || 500;

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

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          {/* Title and Icon */}
          <Box display="flex" alignItems="center" gap={2}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
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

          {/* Student Count and Actions */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Total Students
              </Typography>
              <Chip
                icon={<PersonIcon />}
                label={`${studentCount} Student${studentCount !== 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/member/admin/student")}
            >
              Add Student
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Content Section */}
      {convertedData && convertedData.length > 0 ? (
        <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <StudentDataTable 
            data={convertedData}
            onRefresh={handleRefresh} 
          />
        </Paper>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
          <SchoolIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No Students Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
            You haven't registered any students yet. Start by adding your first student to begin managing their learning journey.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/member/admin/student')}
            startIcon={<PersonIcon />}
          >
            Register New Student
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default StudentList;
