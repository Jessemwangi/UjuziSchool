import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Typography,
  Box,
  Alert,
  Tooltip,
  Stack,
  Divider,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Snackbar
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Message as MessageIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Visibility,
  VisibilityOff,
  Lock as LockIcon
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "../../Component/modules/components/TextField";
import { postData, putData } from "../../UtilitiesFunctions/Function";

const StudentDataTable = ({ data, onRefresh }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Get study level color
  const getStudyLevelColor = (level) => {
    const levelColors = {
      'Primary': 'success',
      'Secondary': 'info', 
      'University': 'warning',
      'Graduate': 'error',
      'Professional': 'default'
    };
    return levelColors[level] || 'default';
  };

  const columns = [
    { 
      field: "id", 
      headerName: "Student ID", 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={`#${params.value}`} 
          size="small" 
          variant="outlined" 
          color="primary"
        />
      )
    },
    { 
      field: "studentName", 
      headerName: "Student Name", 
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
            {params.value.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {params.value}
          </Typography>
        </Box>
      )
    },
    { 
      field: "dateRegistered", 
      headerName: "Registration Date", 
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
          <Typography variant="body2" color="text.secondary">
            {params.value}
          </Typography>
        </Box>
      )
    },
    { 
      field: "studyLevel", 
      headerName: "Study Level", 
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Chip
          icon={<SchoolIcon />}
          label={params.value}
          color={getStudyLevelColor(params.value)}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: "isBlocked",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <BlockIcon /> : <CheckIcon />}
          label={params.value ? "Blocked" : "Active"}
          color={params.value ? "error" : "success"}
          size="small"
          variant={params.value ? "filled" : "outlined"}
        />
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 280,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit Details">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Reset Password">
            <IconButton
              color="warning"
              size="small"
              onClick={() => handleResetPasswordClick(params.row)}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'warning.light',
                  color: 'white'
                }
              }}
            >
              <SecurityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={params.row.isBlocked ? "Unblock Student" : "Block Student"}>
            <IconButton
              color={params.row.isBlocked ? "success" : "warning"}
              size="small"
              onClick={() => handleBlockClick(params.row)}
              sx={{ 
                '&:hover': { 
                  backgroundColor: params.row.isBlocked ? 'success.light' : 'warning.light',
                  color: 'white'
                }
              }}
            >
              <BlockIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Send Message">
            <IconButton 
              color="info" 
              size="small"
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'info.light',
                  color: 'white'
                }
              }}
            >
              <MessageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete Student">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row)}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'error.light',
                  color: 'white'
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleEdit = (student) => {
    setSelectedStudent({ ...student });
    setEditDialogOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleResetPasswordClick = (student) => {
    setSelectedStudent(student);
    setNewPassword('');
    setResetPasswordDialogOpen(true);
  };

  const handleBlockClick = (student) => {
    setSelectedStudent(student);
    setBlockDialogOpen(true);
  };

  const handleUpdateStudent = async () => {
    if (!selectedStudent) return;
    
    setIsUpdating(true);
    try {
      await putData(`/student/update/${selectedStudent.id}`, {
        studentName: selectedStudent.studentName,
        studyLevel: selectedStudent.studyLevel
      });
      
      showSnackbar('Student details updated successfully!');
      setEditDialogOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      showSnackbar('Failed to update student details', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    
    setIsDeleting(true);
    try {
      await putData(`/student/delete/${selectedStudent.id}`, {
        isDeleted: true
      });
      
      showSnackbar('Student deleted successfully!');
      setDeleteDialogOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      showSnackbar('Failed to delete student', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedStudent || !newPassword) return;
    
    setIsResetting(true);
    try {
      await postData('/student/resetPassword', {
        studentName: selectedStudent.studentName,
        newPassword: newPassword
      });
      
      showSnackbar('Password reset successfully!');
      setResetPasswordDialogOpen(false);
      setNewPassword('');
    } catch (error) {
      showSnackbar('Failed to reset password', 'error');
    } finally {
      setIsResetting(false);
    }
  };

const handleBlockStudent = async () => {
  if (!selectedStudent) return;
  
  setIsBlocking(true);
  try {
    // Use different URLs based on current block status
    const url = selectedStudent.isBlocked 
      ? `/student/unblock/${selectedStudent.id}`
      : `/student/block/${selectedStudent.id}`;
    
    await putData(url, {});
    
    const action = selectedStudent.isBlocked ? 'unblocked' : 'blocked';
    showSnackbar(`Student ${action} successfully!`);
    setBlockDialogOpen(false);
    if (onRefresh) onRefresh();
  } catch (error) {
    showSnackbar('Failed to update student status', 'error');
  } finally {
    setIsBlocking(false);
  }
};

  const handleInputChange = (field, value) => {
    setSelectedStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  return (
    <Box>
      <DataGrid 
        rows={data} 
        columns={columns} 
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8f9fa',
            fontWeight: 'bold',
            fontSize: '0.875rem'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f5f5f5'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0'
          }
        }}
        autoHeight
      />

      {/* Edit Student Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <EditIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Edit Student Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Update information for {selectedStudent?.studentName}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Student Name"
              value={selectedStudent?.studentName || ''}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Study Level"
              value={selectedStudent?.studyLevel || ''}
              onChange={(e) => handleInputChange('studyLevel', e.target.value)}
              fullWidth
              required
              helperText="e.g., Primary, Secondary, University, Graduate"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setEditDialogOpen(false)} 
            disabled={isUpdating}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateStudent} 
            variant="contained"
            disabled={isUpdating || !selectedStudent?.studentName || !selectedStudent?.studyLevel}
            startIcon={isUpdating ? null : <EditIcon />}
            size="large"
          >
            {isUpdating ? 'Updating...' : 'Update Student'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog
        open={resetPasswordDialogOpen}
        onClose={() => setResetPasswordDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'warning.main' }}>
              <LockIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Reset Password
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Set new password for {selectedStudent?.studentName}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              The student will need to use this new password for their next login.
            </Alert>
            
            <FormControl fullWidth variant="outlined">
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            </FormControl>

            <Button 
              variant="outlined" 
              onClick={generateRandomPassword}
              startIcon={<SecurityIcon />}
              fullWidth
            >
              Generate Random Password
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setResetPasswordDialogOpen(false)}
            disabled={isResetting}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleResetPassword} 
            color="warning"
            variant="contained"
            disabled={isResetting || !newPassword}
            startIcon={isResetting ? null : <SecurityIcon />}
            size="large"
          >
            {isResetting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Block/Unblock Dialog */}
      <Dialog
        open={blockDialogOpen}
        onClose={() => setBlockDialogOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: selectedStudent?.isBlocked ? 'success.main' : 'warning.main' }}>
              <BlockIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {selectedStudent?.isBlocked ? 'Unblock' : 'Block'} Student
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedStudent?.isBlocked ? 'Restore access' : 'Restrict access'} for {selectedStudent?.studentName}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Alert 
            severity={selectedStudent?.isBlocked ? "info" : "warning"} 
            sx={{ borderRadius: 2 }}
          >
            <Typography variant="body2">
              {selectedStudent?.isBlocked 
                ? 'This will restore the student\'s access to the platform and all features.'
                : 'This will prevent the student from accessing the platform until unblocked.'
              }
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setBlockDialogOpen(false)}
            disabled={isBlocking}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBlockStudent} 
            color={selectedStudent?.isBlocked ? "success" : "warning"}
            variant="contained"
            disabled={isBlocking}
            startIcon={isBlocking ? null : <BlockIcon />}
            size="large"
          >
            {isBlocking 
              ? (selectedStudent?.isBlocked ? 'Unblocking...' : 'Blocking...')
              : (selectedStudent?.isBlocked ? 'Unblock Student' : 'Block Student')
            }
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'error.main' }}>
              <WarningIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Confirm Deletion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            <Typography variant="body2" fontWeight="medium">
              Warning: This will permanently mark the student as deleted!
            </Typography>
          </Alert>
          <Typography variant="body1">
            Are you sure you want to delete <strong>{selectedStudent?.studentName}</strong>? 
            This will set their status to deleted in the system.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
            size="large"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteStudent} 
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting ? null : <DeleteIcon />}
            size="large"
          >
            {isDeleting ? 'Deleting...' : 'Delete Student'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentDataTable;