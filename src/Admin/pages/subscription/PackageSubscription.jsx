import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Alert, CircularProgress, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import RFTextField from "../../../Component/modules/form/RFTextField";
import FormFeedback from "../../../Component/modules/form/FormFeedback";
import FormButton from "../../../Component/modules/form/FormButton";
import { email, required } from "../../../Component/modules/form/validation";
import { useUser } from "../../../hooks/UserContext";
import CountrySelect from "../../../Component/modules/components/Country";
import Typography from "../../../Component/modules/components/Typography";
import { postData, get_Data, putData } from "../../../UtilitiesFunctions/Function";
import { useFetch } from "../../../hooks/useFetch";
import Button from "../../../Component/modules/components/Button";

const PackageSubscription = () => {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [agentFetchUrl, setAgentFetchUrl] = useState(null);
  const [packageFetchUrl, setPackageFetchUrl] = useState(null);
  const [pendingSubscription, setPendingSubscription] = useState(null);
  const [checkingPending, setCheckingPending] = useState(false);
  const { packageId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch subscription package to get numeric ID
  useEffect(() => {
    if (packageId) {
      setPackageFetchUrl(`/subscription-packages/${packageId}`);
    }
  }, [packageId]);

  // Fetch agent details
  useEffect(() => {
    if (user?.id) {
      setAgentFetchUrl(`/agents-details?filters[users_permissions_user][id][$eq]=${user.id}`);
    }
  }, [user]);

  const { loading: packageLoading, data: packageData, error: packageError } = useFetch(packageFetchUrl);
  const { loading: agentLoading, data: agentData, error: agentError } = useFetch(agentFetchUrl);

  // Get the numeric IDs
  const packageNumericId = packageData?.data?.id;
  const agentDetailId = agentData?.data?.[0]?.id;

  // Check for pending subscriptions when agent and package data are loaded
  useEffect(() => {
    const checkPendingSubscriptions = async () => {
      if (agentDetailId && packageNumericId && user?.jwt) {
        setCheckingPending(true);
        try {
          const response = await get_Data(
            `/subscriptions/check-pending?agentId=${agentDetailId}&packageId=${packageNumericId}`,
            user.jwt
          );
          if (response?.data && response.data.length > 0) {
            setPendingSubscription(response.data[0]);
          }
        } catch (error) {
          // Error already handled
        } finally {
          setCheckingPending(false);
        }
      }
    };

    checkPendingSubscriptions();
  }, [agentDetailId, packageNumericId, user?.jwt]);

  const handleCancelPending = async () => {
    if (!pendingSubscription || !user?.jwt) return;
    
    try {
      await putData(
        `/subscriptions/${pendingSubscription.id}/cancel-pending`,
        {},
        user.jwt
      );
      setPendingSubscription(null);
      alert('Pending subscription cancelled successfully. You can now create a new one.');
    } catch (error) {
      alert(error?.response?.data?.error?.message || 'Failed to cancel subscription');
    }
  };

  if (!user) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
        </div>
      </div>
    );
  }
  
  if (packageLoading || agentLoading || checkingPending) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
<div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{`OOPPs! our bad, Landed into an error : ${err}`}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    //   <SystemError
    //     errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}
    //   />
    );
  }

   if (agentError) {
const errorMessage = agentError?.response?.data?.error?.message || agentError?.response?.data?.error?.name  || agentError.message || 'Something went wrong';
    const statusCode = agentError?.response?.status || agentError?.status || 500;
    if (errorMessage === 'Forbidden' || statusCode === 403 || errorMessage === 'Forbidden access') {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="info" sx={{ marginBottom: '1rem' }}>You are not an agent</Alert>
          <Button variant="contained" onClick={() => navigate('/member/agent-registration')}>Register as Agent</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{errorMessage}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }
}

  if (!packageNumericId) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>Package not found</Alert>
          <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!agentDetailId) {
    return (
              <div className="adminMain">
        <div className="main-content">
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>{'No agent details found. Please create an agent profile first.'}</Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Show pending subscription warning
  if (pendingSubscription) {
    return (
      <div className="adminMain">
        <div className="main-content">
          <Alert severity="warning" sx={{ marginBottom: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Pending Subscription Found
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              You already have a pending subscription request for this package that is awaiting approval.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Institution:</strong> {pendingSubscription.institution}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Package:</strong> {pendingSubscription.subscription_package?.packageName || 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Submitted:</strong> {new Date(pendingSubscription.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              If you want to create a new subscription for this package, you must first cancel the pending one.
            </Typography>
          </Alert>
          <Grid container spacing={2}>
            <Grid item>
              <Button 
                variant="contained" 
                color="error"
                onClick={handleCancelPending}
              >
                Cancel Pending Subscription
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined"
                onClick={() => navigate('/member/admin/subscriptions')}
              >
                View All Subscriptions
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  // Generate registration number (you can modify this logic as needed)
  const generateRegNumber = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `SUB-${currentYear}-${randomNum}`;
  };

  const initialValues = {
    regNumber: generateRegNumber(),
    institution: "",
    address: "",
    contactPerson: "",
    email: "",
    country: "",
    contractNumber: "",
    startDate: "",
    endDate: "",
    comment: "Pending approval.",
  };

  const handleSubmit = async (values) => {
    try {
      const data = {
        ...values,
        isActive: true,
        isApproved: false,
        subscription_package: packageNumericId,
        agents_detail: agentDetailId
      };
      
      await postData("/subscriptions", { data }, user?.jwt);
      setSent(true);
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || "Failed to create subscription";
      const errorDetails = error?.response?.data?.error?.details;
      
      // If it's a conflict error about pending subscription, show more details
      if (error?.response?.status === 409 && errorDetails?.existingSubscriptionId) {
        setErr(`${errorMessage} (Subscription ID: ${errorDetails.existingSubscriptionId})`);
      } else {
        setErr(errorMessage);
      }
    }
  };

  const validate = (values) => {
    const errors = required(
      [
        "institution",
        "address", 
        "contactPerson",
        "email",
        "country",
        "contractNumber",
        "startDate",
        "endDate"
      ],
      values
    );
    
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    
    // Validate dates
    if (values.startDate && values.endDate) {
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);
      if (endDate <= startDate) {
        errors.endDate = "End date must be after start date";
      }
    }
    
    return errors;
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Typography variant="h4" color="success.main">
          Subscription Created Successfully!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your package subscription has been submitted and is pending approval.
        </Typography>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Create Package Subscription
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 1 }}>
        Package: {packageData?.data?.packageName || packageId}
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Package ID: {packageNumericId}
      </Typography>
      
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <form onSubmit={handleSubmit2} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={true} // Registration number is auto-generated
                  name="regNumber"
                  label="Registration Number"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="institution"
                  autoComplete="organization"
                  label="Institution"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="address"
                  autoComplete="street-address"
                  label="Address"
                  margin="normal"
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="contactPerson"
                  autoComplete="name"
                  label="Contact Person"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="email"
                  autoComplete="email"
                  label="Email Address"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="country"
                  component={CountrySelect}
                  autoComplete="country"
                  disabled={submitting}
                  margin="normal"
                  label="Choose a country"
                  size="medium"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="contractNumber"
                  label="Contract Number"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="startDate"
                  label="Start Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="endDate"
                  label="End Date"
                  type="date"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={true}
                  name="comment"
                  label="Comment"
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) =>
                submitError ? (
                  <FormFeedback error sx={{ mt: 2 }}>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>

            <FormButton
              sx={{
                mt: 3,
                mb: 2,
                fontSize: 16,
                padding: "10px 20px",
                width: "max-content",
              }}
              disabled={submitting}
              color="secondary"
              fullWidth
            >
              {submitting ? "Creating Subscription..." : "Create Subscription"}
            </FormButton>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default PackageSubscription;