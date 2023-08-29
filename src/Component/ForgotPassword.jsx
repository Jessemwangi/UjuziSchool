import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import { postData } from "../UtilitiesFunctions/Function";
import {  LinearProgress, Link } from "@mui/material";
import TungstenOutlinedIcon from "@mui/icons-material/TungstenOutlined";
import { useNavigate } from "react-router-dom";
import MessageInfo from "./modules/components/MessageInfo";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const [err, setErr] = React.useState();
  const [userEmail, setUserEmail] = React.useState()
const navigate =useNavigate()
  const validate = (values) => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await postData(`/auth/forgot-password`, values);
     if(response.ok){
      setLoading(false);
      setUserEmail(values.email)
       setSent(true);
       await new Promise((resolve) => setTimeout(resolve,7000))
       setSent(false)
       navigate('/sign-in')
     }
    
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.error?.message);
      setLoading(false);
    }
    
  };

  

  if (loading) return <LinearProgress color="secondary" />
if (sent) return <MessageInfo message={`Password reset instruction Sent successfully to:- ${userEmail}`} backgroundColor={'white'} textColor={'#BA68C8'}/>

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              "send you a link to reset your password."}
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
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
                sx={{ mt: 3, mb: 2, backgroundColor: "purple" }}
                disabled={submitting || sent}
                size="large"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Send reset link"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <TungstenOutlinedIcon /> Rings a bell ?{" "}
          <Link underline="always" href="/sign-in">
            Sign In
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ForgotPassword);
