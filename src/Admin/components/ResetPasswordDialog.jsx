import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { putData } from "../../UtilitiesFunctions/Function";
import { useUser } from "../../hooks/UserContext";

const ResetPasswordDialog = ({ open, onClose, student, onSuccess }) => {
  const { user } = useUser();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      showSnackbar("Password must be at least 6 characters", "error");
      return;
    }

    setIsProcessing(true);
    try {
      await putData(`/agent/reset_student_password`, {
        studentName: student.studentName,
        newPassword: newPassword
      });
      
      showSnackbar("Password reset successfully", "success");
      setNewPassword("");
      onSuccess();
      onClose();
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Failed to reset password",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!student) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <LockIcon color="primary" />
            Reset Password
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Student Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Resetting password for:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {student.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: #{student.id}
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 3 }}>
            Remember to share the new password with the student securely.
          </Alert>

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="New Password *"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password (min 6 characters)"
            helperText="Password must be at least 6 characters long"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          
          <Button
            onClick={handleResetPassword}
            variant="contained"
            disabled={isProcessing || !newPassword.trim() || newPassword.length < 6}
            startIcon={isProcessing ? <CircularProgress size={16} /> : <LockIcon />}
          >
            {isProcessing ? "Resetting..." : "Reset Password"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  );
};

export default ResetPasswordDialog;
