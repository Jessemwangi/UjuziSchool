import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Snackbar,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  Support,
  Send,
  CheckCircle,
  Error as ErrorIcon,
  ContactSupport,
  Person,
  Category,
  Message,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/UserContext";

const ContactAdmin = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    otherCategory: "",
    agentNumber: "",
    subject: "",
    message: "",
    urgency: "medium",
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [errors, setErrors] = useState({});

  // Support categories
  const supportCategories = [
    { value: "account_activation", label: "Account Activation" },
    { value: "approval_status", label: "Approval Status" },
    { value: "technical_issue", label: "Technical Issue" },
    { value: "billing_payment", label: "Billing & Payment" },
    { value: "profile_update", label: "Profile Update" },
    { value: "feature_request", label: "Feature Request" },
    { value: "training_support", label: "Training & Support" },
    { value: "policy_question", label: "Policy Question" },
    { value: "other", label: "Other" },
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - General inquiry", color: "info" },
    { value: "medium", label: "Medium - Standard support", color: "warning" },
    { value: "high", label: "High - Urgent issue", color: "error" },
  ];

  // Check if user is an agent (you might need to adjust this based on your user structure)
  const isAgent = user?.role?.name === "agent" || user?.agentNumber;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (formData.category === "other" && !formData.otherCategory.trim()) {
      newErrors.otherCategory = "Please specify the category";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (isAgent && !formData.agentNumber.trim()) {
      newErrors.agentNumber = "Agent number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors before submitting",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare the payload
      const payload = {
        userId: user.id,
        userName: user.username,
        userEmail: user.email,
        category:
          formData.category === "other"
            ? formData.otherCategory
            : formData.category,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        urgency: formData.urgency,
        isAgent: isAgent,
        ...(isAgent && { agentNumber: formData.agentNumber.trim() }),
        timestamp: new Date().toISOString(),
      };

      // Make the API call
      const response = await fetch("/agent/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const result = await response.json();

      // Success
      setSnackbar({
        open: true,
        message:
          "Your message has been sent successfully! We'll get back to you soon.",
        severity: "success",
      });

      // Reset form
      setFormData({
        category: "",
        otherCategory: "",
        agentNumber: "",
        subject: "",
        message: "",
        urgency: "medium",
      });
    } catch (error) {
    
      setSnackbar({
        open: true,
        message: error.message || "Failed to send message. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <ContactSupport sx={{ fontSize: 40, color: "#1976d2" }} />
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Contact Admin Support
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Get help with your account and platform issues
            </Typography>
          </Box>
        </Box>

        {isAgent && (
          <Alert severity="info" sx={{ borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>Agent Support:</strong> Your agent status has been
              detected. Please include your agent number for faster assistance.
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* Contact Form */}
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              {/* User Info Display */}
              <Box
                sx={{
                  p: 2,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Contact Information
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  <Chip
                    icon={<Person />}
                    label={`${user.username}`}
                    variant="outlined"
                    size="small"
                  />
                  <Chip label={user.email} variant="outlined" size="small" />
                  {isAgent && (
                    <Chip
                      label="Agent Account"
                      color="primary"
                      variant="filled"
                      size="small"
                    />
                  )}
                </Box>
              </Box>

              {/* Category Selection */}
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Support Category *</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  label="Support Category *"
                  startAdornment={
                    <Category sx={{ mr: 1, color: "text.secondary" }} />
                  }
                >
                  {supportCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>

              {/* Other Category Input */}
              {formData.category === "other" && (
                <TextField
                  fullWidth
                  label="Please specify category *"
                  value={formData.otherCategory}
                  onChange={(e) =>
                    handleInputChange("otherCategory", e.target.value)
                  }
                  error={!!errors.otherCategory}
                  helperText={errors.otherCategory}
                  placeholder="Describe your support category"
                />
              )}

              {/* Agent Number (if user is agent) */}
              {isAgent && (
                <TextField
                  fullWidth
                  label="Agent Number *"
                  value={formData.agentNumber}
                  onChange={(e) =>
                    handleInputChange("agentNumber", e.target.value)
                  }
                  error={!!errors.agentNumber}
                  helperText={
                    errors.agentNumber || "Your agent identification number"
                  }
                  placeholder="Enter your agent number"
                />
              )}

              {/* Urgency Level */}
              <FormControl fullWidth>
                <InputLabel>Urgency Level</InputLabel>
                <Select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange("urgency", e.target.value)}
                  label="Urgency Level"
                >
                  {urgencyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                          size="small"
                          color={level.color}
                          variant="outlined"
                          sx={{ minWidth: 60 }}
                        />
                        {level.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Subject */}
              <TextField
                fullWidth
                label="Subject *"
                InputProps={{
                  sx: { height: "56px" },
                }}
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                error={!!errors.subject}
                helperText={errors.subject || "Brief description of your issue"}
                placeholder="Enter the subject of your inquiry"
              />

              {/* Message */}
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Message *"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                error={!!errors.message}
                helperText={
                  errors.message ||
                  "Provide detailed information about your issue or question"
                }
                placeholder="Please describe your issue or question in detail. Include any relevant information that might help us assist you better."
                InputProps={{
                  startAdornment: (
                    <Message
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        alignSelf: "flex-start",
                        mt: 1,
                      }}
                    />
                  ),
                }}
              />

              {/* Character count for message */}
              <Typography
                variant="caption"
                color="text.secondary"
                align="right"
                sx={{ mt: -2 }}
              >
                {formData.message.length} characters
              </Typography>

              {/* Submit Button */}
              <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Send />
                  }
                  sx={{ minWidth: 140 }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          icon={
            snackbar.severity === "success" ? <CheckCircle /> : <ErrorIcon />
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactAdmin;
