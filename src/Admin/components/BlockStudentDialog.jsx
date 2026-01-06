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
  Chip,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Block as BlockIcon, Warning as WarningIcon } from "@mui/icons-material";
import { putData } from "../../UtilitiesFunctions/Function";
import { useUser } from "../../hooks/UserContext";

const BlockStudentDialog = ({ open, onClose, student, onSuccess }) => {
  const { user } = useUser();
  const [blockReason, setBlockReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleBlock = async () => {
    if (!blockReason.trim()) {
      showSnackbar("Please provide a reason for blocking", "error");
      return;
    }

    setIsProcessing(true);
    try {
      await putData(`/agent/block_student/${student.id}`, {
        reason: blockReason
      });
      
      showSnackbar("Student blocked successfully", "success");
      setBlockReason("");
      onSuccess();
      onClose();
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Failed to block student",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnblock = async () => {
    setIsProcessing(true);
    try {
      await putData(`/agent/unblock_student/${student.id}`, {});
      
      showSnackbar("Student unblocked successfully", "success");
      onSuccess();
      onClose();
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Failed to unblock student",
        "error"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!student) return null;

  const isBlocked = student.isBlocked;
  const isLearning = student.isLearning;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <BlockIcon color={isBlocked ? "success" : "error"} />
            {isBlocked ? "Unblock Student" : "Block Student"}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {/* Student Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Student Details
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {student.studentName}
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

          {/* Learning Status Warning */}
          {isLearning && !isBlocked && (
            <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                This student has started learning
              </Typography>
              <Typography variant="caption">
                Blocking will prevent access but keep their progress data intact.
                They will remain in their subscription.
              </Typography>
            </Alert>
          )}

          {/* Current Block Status */}
          {isBlocked && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                Currently Blocked
              </Typography>
              {student.blockedReason && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Reason: {student.blockedReason}
                </Typography>
              )}
              {student.blockedAt && (
                <Typography variant="caption" display="block">
                  Blocked on: {new Date(student.blockedAt).toLocaleString()}
                </Typography>
              )}
            </Alert>
          )}

          {/* Block Reason Input */}
          {!isBlocked && (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason for Blocking *"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Enter a clear reason for blocking this student..."
              helperText="This reason will be recorded for future reference"
              sx={{ mt: 2 }}
            />
          )}

          {/* Business Rule Info */}
          {!isBlocked && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "info.50", borderRadius: 1, border: "1px solid", borderColor: "info.200" }}>
              <Typography variant="caption" color="info.main" display="block" fontWeight="medium">
                ℹ️ Blocking Policy:
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                • Student will be unable to log in
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • All progress and data will be preserved
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Subscription slot remains occupied
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                • Can be unblocked at any time
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          
          {isBlocked ? (
            <Button
              onClick={handleUnblock}
              variant="contained"
              color="success"
              disabled={isProcessing}
              startIcon={isProcessing && <CircularProgress size={16} />}
            >
              {isProcessing ? "Unblocking..." : "Unblock Student"}
            </Button>
          ) : (
            <Button
              onClick={handleBlock}
              variant="contained"
              color="error"
              disabled={isProcessing || !blockReason.trim()}
              startIcon={isProcessing && <CircularProgress size={16} />}
            >
              {isProcessing ? "Blocking..." : "Block Student"}
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

export default BlockStudentDialog;
