import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material";
import { putData } from "../../UtilitiesFunctions/Function";
import { useUser } from "../../hooks/UserContext";

const DeleteConfirmDialog = ({ open, onClose, student, onSuccess }) => {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleDelete = async () => {
    if (student.isLearning) {
      showSnackbar(
        "Cannot delete student who has started learning. Please block them instead.",
        "error"
      );
      return;
    }

    setIsProcessing(true);
    try {
      await putData(`/agent/delete_student/${student.id}`, {
        isDeleted: true
      });
      
      showSnackbar("Student deleted successfully", "success");
      onSuccess();
      onClose();
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Failed to delete student",
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
            <DeleteIcon color="error" />
            Delete Student
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {student.isLearning ? (
            <Alert severity="error" icon={<WarningIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                Cannot Delete Learning Student
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                This student has already started learning. To prevent data loss and
                maintain system integrity, you cannot delete them.
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                <strong>Alternative:</strong> Use the Block feature to prevent access
                while preserving their data.
              </Typography>
            </Alert>
          ) : (
            <>
              <Alert severity="warning" sx={{ mb: 2 }}>
                This action cannot be undone. All student data will be permanently deleted.
              </Alert>

              <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  You are about to delete:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {student.studentName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: #{student.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Study Level: {student.studyLevel || "N/A"}
                </Typography>
                {student.subscription && (
                  <Typography variant="body2" color="text.secondary">
                    Subscription: {student.subscription.institution}
                  </Typography>
                )}
              </Box>

              <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: "medium" }}>
                ⚠️ This will permanently delete:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 3 }}>
                <Typography component="li" variant="caption" color="text.secondary">
                  Student account and login credentials
                </Typography>
                <Typography component="li" variant="caption" color="text.secondary">
                  All associated data
                </Typography>
                <Typography component="li" variant="caption" color="text.secondary">
                  Progress records (if any)
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          
          {!student.isLearning && (
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={isProcessing}
              startIcon={isProcessing ? <CircularProgress size={16} /> : <DeleteIcon />}
            >
              {isProcessing ? "Deleting..." : "Delete Permanently"}
            </Button>
          )}
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

export default DeleteConfirmDialog;
