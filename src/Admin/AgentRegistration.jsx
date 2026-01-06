import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { 
  Grid, 
  Box, 
  Card, 
  CardContent, 
  Alert, 
  Chip,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { 
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postData } from "../UtilitiesFunctions/Function";
import Typography from "../Component/modules/components/Typography";
import RFTextField from "../Component/modules/form/RFTextField";
import FormFeedback from "../Component/modules/form/FormFeedback";
import FormButton from "../Component/modules/form/FormButton";
import { useFetch } from "../hooks/useFetch";
import { useUser } from "../hooks/UserContext";

const AgentRegistration = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(true);
  const [contractDoc, setContractDoc] = useState(null);
  const [agentFetchUrl, setAgentFetchUrl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Check if user is already registered when component mounts
  useEffect(() => {
    if (user?.id) {
      setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
    }
  }, [user]);

  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);
  
  useEffect(() => {
    if (agentData) {
      if (agentData?.data?.length > 0) {
        setIsAlreadyRegistered(true);
        setIsCheckingRegistration(false);
      } else {
        setIsCheckingRegistration(false);
      }
    } else if (agentError) {
      // console.error("Error fetching agent data:", agentError);
      showSnackbar('Error checking registration status', 'error');
      setIsCheckingRegistration(false);
    }
  }, [agentData, agentError]);

  const [otherDocuments, setOtherDocuments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});

  // Generate agent number only once
  const [agentNumber] = useState(() => `AGT${Date.now().toString().slice(-7)}`);

  const initialValues = {
    agentNumber: agentNumber,
    engagementType: "Independent Contractor",
    companyName: "",
    phoneNumber: "",
    address: "",
    notes: "",
    isActive: true,
    isApproved: false,
  };

  const validate = (values) => {
    const errors = {};
    if (!values.agentNumber) {
      errors.agentNumber = "Agent number is required";
    }
    if (!values.engagementType) {
      errors.engagementType = "Engagement type is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!contractDoc) {
      errors.contractDoc = "Contract document is required";
    }
    return errors;
  };

  // File upload function
  const uploadFile = async (file, fileType = 'single') => {
    const formData = new FormData();
    formData.append('files', file);

    let progressInterval;
    try {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      // Simulate upload progress
      progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: Math.min((prev[file.name] || 0) + 10, 90)
        }));
      }, 200);

      const response = await postData('/upload', formData);

      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

      return response[0];
    } catch (error) {
      if (progressInterval) clearInterval(progressInterval);
      const errorMsg = error.response?.data?.error?.message || error.message || 'Upload failed';
      setUploadErrors(prev => ({ ...prev, [file.name]: errorMsg }));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
      showSnackbar(`Upload failed: ${errorMsg}`, 'error');
      throw error;
    }
  };

  const handleContractUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = 'Only PDF, DOC, DOCX, JPG, PNG files are allowed';
      setUploadErrors(prev => ({ ...prev, [file.name]: errorMsg }));
      showSnackbar(errorMsg, 'error');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = 'File size must be less than 5MB';
      setUploadErrors(prev => ({ ...prev, [file.name]: errorMsg }));
      showSnackbar(errorMsg, 'error');
      return;
    }

    try {
      const uploadedFile = await uploadFile(file);
      setContractDoc({
        id: uploadedFile.id,
        name: uploadedFile.name,
        url: uploadedFile.url,
        size: uploadedFile.size
      });
      setUploadErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[file.name];
        return newErrors;
      });
      showSnackbar('Contract document uploaded successfully!', 'success');
    } catch (error) {
      // console.error('Contract upload error:', error);
       showSnackbar('Contract upload error:', 'error');
    }
  };

  const handleOtherDocumentsUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      // Validate file
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        const errorMsg = 'Only PDF, DOC, DOCX, JPG, PNG files are allowed';
        setUploadErrors(prev => ({ ...prev, [file.name]: errorMsg }));
        showSnackbar(errorMsg, 'error');
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = 'File size must be less than 5MB';
        setUploadErrors(prev => ({ ...prev, [file.name]: errorMsg }));
        showSnackbar(errorMsg, 'error');
        continue;
      }

      try {
        const uploadedFile = await uploadFile(file);
        setOtherDocuments(prev => [...prev, {
          id: uploadedFile.id,
          name: uploadedFile.name,
          url: uploadedFile.url,
          size: uploadedFile.size
        }]);
        setUploadErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[file.name];
          return newErrors;
        });
        showSnackbar(`${file.name} uploaded successfully!`, 'success');
      } catch (error) {
     const err_message = error.response?.data?.error?.message || error.message || 'Upload failed';
         showSnackbar(`Upload failed: ${err_message}`, 'error');
      }
    }
  };

  const removeContractDoc = () => {
    setContractDoc(null);
    showSnackbar('Contract document removed', 'info');
  };

  const removeOtherDocument = (index) => {
    const docName = otherDocuments[index].name;
    setOtherDocuments(prev => prev.filter((_, i) => i !== index));
    showSnackbar(`${docName} removed`, 'info');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (values) => {
    try {
      if (!contractDoc) {
        throw new Error('Contract document is required');
      }

      const payload = {
        data: {
          users_permissions_user: {
            connect: [user.id]
          },
          agentNumber: values.agentNumber,
          engagementType: values.engagementType,
          companyName: values.companyName || null,
          phoneNumber: values.phoneNumber,
          address: values.address || null,
          notes: values.notes || null,
          contractDoc: contractDoc.id,
          OtherDocument: otherDocuments.map(doc => doc.id),
          isActive: values.isActive || true,
          isApproved: false,
        }
      };

      const response = await postData('/agents-details', payload);
      
      if (response) {
        showSnackbar('Registration submitted successfully! Awaiting approval.', 'success');
        setSent(true);
        setTimeout(() => {
          navigate('/member/admin/agent-dashboard');
        }, 2000);
      }
    } catch (error) {
      // Handle specific error for already registered user
      if (error.response?.data?.error?.message === "Agent user already exists") {
        setIsAlreadyRegistered(true);
        showSnackbar('You are already registered as an agent. Redirecting to dashboard...', 'info');
        setTimeout(() => {
          navigate('/member/admin/agent-dashboard');
        }, 2000);
        return;
      }
      
      // Handle other errors
      const errorMessage = error.response?.data?.error?.message || error.message || 'Registration failed. Please try again.';
      showSnackbar(errorMessage, 'error');
      throw new Error(errorMessage);
    }
  };

  // Show loading while checking registration status
  if (isCheckingRegistration) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Checking registration status...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (sent) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Registration Submitted Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your agent registration has been submitted for approval. You will be redirected to the dashboard shortly.
        </Typography>
      </Box>
    );
  }

  // Handle already registered user
  if (isAlreadyRegistered) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, p: 4 }}>
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            p: 3,
            fontSize: '1.1rem',
            '& .MuiAlert-message': { textAlign: 'center', width: '100%' }
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            You're Already Registered!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You are already registered as an agent in our system. You can access your dashboard to manage your subscriptions and view your performance.
          </Typography>
        </Alert>
        
        <Box sx={{ mt: 3 }}>
          <FormButton
            sx={{
              fontSize: 16,
              padding: "12px 30px",
              borderRadius: 2,
              mr: 2
            }}
            color="primary"
            onClick={() => navigate('/member/admin/agent-dashboard')}
          >
            Go to Dashboard
          </FormButton>
          
          <FormButton
            sx={{
              fontSize: 16,
              padding: "12px 30px",
              borderRadius: 2,
            }}
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Back to Home
          </FormButton>
        </Box>
      </Box>
    );
  }

  return (
   <>
   {!agentLoading &&
   <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 3, mb: 4 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Agent Registration
        </Typography>
        <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
          Join our network of educational agents and start making a difference
        </Typography>
      </Paper>

      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <form onSubmit={handleSubmit2} noValidate>
            <Grid container spacing={4}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}>
                      <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Basic Information
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Field
                          fullWidth
                          component={RFTextField}
                          disabled={submitting}
                          required
                          name="agentNumber"
                          label="Agent Number"
                          margin="normal"
                          InputProps={{ readOnly: true }}
                          helperText="Auto-generated unique identifier"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" margin="normal" fullWidth>
                          <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                            Engagement Type *
                          </FormLabel>
                          <Field name="engagementType">
                            {({ input }) => (
                              <RadioGroup {...input} row>
                                <FormControlLabel 
                                  value="Independent Contractor" 
                                  control={<Radio />} 
                                  label="Independent Contractor" 
                                />
                                <FormControlLabel 
                                  value="Employee" 
                                  control={<Radio />} 
                                  label="Employee" 
                                />
                                <FormControlLabel 
                                  value="Partner" 
                                  control={<Radio />} 
                                  label="Partner" 
                                />
                              </RadioGroup>
                            )}
                          </Field>
                        </FormControl>
                      </Grid>

                      {/* Company Name */}
                      <Grid item xs={12} sm={6}>
                        <Field
                          fullWidth
                          component={RFTextField}
                          disabled={submitting}
                          name="companyName"
                          label="Company Name"
                          margin="normal"
                          helperText="Optional: Your company or organization name"
                        />
                      </Grid>

                      {/* Phone Number */}
                      <Grid item xs={12} sm={6}>
                        <Field
                          fullWidth
                          component={RFTextField}
                          disabled={submitting}
                          required
                          name="phoneNumber"
                          label="Phone Number"
                          margin="normal"
                          helperText="Your contact phone number"
                        />
                      </Grid>

                      {/* Address */}
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          component={RFTextField}
                          disabled={submitting}
                          name="address"
                          label="Address"
                          margin="normal"
                          multiline
                          rows={2}
                          helperText="Your physical or mailing address"
                        />
                      </Grid>

                      {/* Notes */}
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          component={RFTextField}
                          disabled={submitting}
                          name="notes"
                          label="Additional Notes"
                          margin="normal"
                          multiline
                          rows={3}
                          helperText="Any additional information you'd like to share"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contract Document Upload */}
              <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}>
                      <CloudUploadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Contract Document *
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Please upload your signed contract document. Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                    </Alert>

                    {!contractDoc ? (
                      <Box
                        sx={{
                          border: '2px dashed #ccc',
                          borderRadius: 2,
                          p: 4,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover'
                          }
                        }}
                        onClick={() => document.getElementById('contract-upload').click()}
                      >
                        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                          Click to upload contract document
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Drag and drop your file here or click to browse
                        </Typography>
                        <input
                          id="contract-upload"
                          type="file"
                          hidden
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleContractUpload}
                        />
                      </Box>
                    ) : (
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleIcon sx={{ color: 'success.main', mr: 2 }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {contractDoc.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatFileSize(contractDoc.size)}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton onClick={removeContractDoc} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    )}

                    {/* Upload Progress */}
                    {Object.keys(uploadProgress).map(fileName => (
                      <Box key={fileName} sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Uploading {fileName}...
                        </Typography>
                        <LinearProgress variant="determinate" value={uploadProgress[fileName]} />
                      </Box>
                    ))}

                    {/* Upload Errors */}
                    {Object.keys(uploadErrors).map(fileName => (
                      <Alert key={fileName} severity="error" sx={{ mt: 2 }}>
                        {fileName}: {uploadErrors[fileName]}
                      </Alert>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Other Documents Upload */}
              <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 3 }}>
                      <CloudUploadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Additional Documents (Optional)
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Upload any additional documents such as certifications, ID copies, etc.
                    </Alert>

                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'action.hover'
                        }
                      }}
                      onClick={() => document.getElementById('other-docs-upload').click()}
                    >
                      <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body1" gutterBottom>
                        Click to upload additional documents
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        You can select multiple files
                      </Typography>
                      <input
                        id="other-docs-upload"
                        type="file"
                        hidden
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleOtherDocumentsUpload}
                      />
                    </Box>

                    {/* Uploaded Documents List */}
                    {otherDocuments.length > 0 && (
                      <Card variant="outlined">
                        <List>
                          {otherDocuments.map((doc, index) => (
                            <React.Fragment key={index}>
                              <ListItem>
                                <CheckCircleIcon sx={{ color: 'success.main', mr: 2 }} />
                                <ListItemText
                                  primary={doc.name}
                                  secondary={formatFileSize(doc.size)}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton 
                                    edge="end" 
                                    onClick={() => removeOtherDocument(index)}
                                    color="error"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                              {index < otherDocuments.length - 1 && <Divider />}
                            </React.Fragment>
                          ))}
                        </List>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Status Information */}
              <Grid item xs={12}>
                <Card elevation={2} sx={{ borderRadius: 2, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Registration Status
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Chip 
                          label="Active: Yes" 
                          sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            fontWeight: 'bold' 
                          }} 
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Chip 
                          label="Approval: Pending" 
                          sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.2)', 
                            color: 'white',
                            fontWeight: 'bold' 
                          }} 
                        />
                      </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                      Your registration will be reviewed by our team within 2-3 business days.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback error sx={{ mt: 3 }}>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <FormButton
                sx={{
                  mt: 2,
                  mb: 2,
                  fontSize: 18,
                  padding: "15px 40px",
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  }
                }}
                disabled={submitting || !contractDoc}
                color="primary"
                size="large"
              >
                {submitting ? "Submitting Registration..." : "Submit Registration"}
              </FormButton>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                By submitting this registration, you agree to our terms and conditions.
              </Typography>
            </Box>
          </form>
        )}
      </Form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
   }
   </> 
  );
};

export default AgentRegistration;