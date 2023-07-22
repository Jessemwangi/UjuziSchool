import * as React from "react";
import Box from "@mui/material/Box";
import { Field, Form, FormSpy } from "react-final-form";
import { required } from "../modules/form/validation";
import AppForm from "../modules/views/AppForm";
import Typography from "../modules/components/Typography";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import withRoot from "../modules/withRoot";
import axios from "axios";

const SignUp = () => {
  const [sent, setSent] = React.useState(false);
  const [resetToken, setResetToken] = React.useState('');
  const [resetStatus, setResetStatus] = React.useState('');
  const server =process.env.REACT_APP_SERVER_URL

  React.useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    setResetToken(code);
  }, []);

  const validate = (values) => {
    const errors = required(["password", "password2"], values);

    if (values.password !== values.password2) {
      errors.password2 = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    console.log(values);
     setSent(true);
     let  response
    try {
        response  = await axios.post(`${server}/auth/reset-password`, {
        password: values.password,
        passwordConfirmation:values.password2,
        code: resetToken,
      });
      console.log(response.data); 
      setResetStatus('success');
    } catch (error) {
      console.error(error, 'error message is ', error.response?.data?.error?.message);
      setResetStatus(error.response?.data?.error?.message + 'error');
    }
  };


  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Reset Password
          </Typography>
          <Typography variant="body2" align="center">
            create a new Password
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
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password2"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ errors: true, values: true }}>
                {({ errors, values }) => {
                  const hasErrors = errors && Object.keys(errors).length > 0;
                  const hasEmptyRequiredFields =
                    !values.password || !values.password2;
                  return (
                    <FormButton
                      sx={{ mt: 3, mb: 2 }}
                      disabled={
                        submitting ||
                        sent ||
                        hasErrors ||
                        hasEmptyRequiredFields
                      }
                      color="secondary"
                      fullWidth
                    >
                      {submitting || sent ? "In progress…" : "Submit"}
                    </FormButton>
                  );
                }}
              </FormSpy>
            </Box>
          )}
        </Form>
        {resetStatus && <Typography variant="body2" align="center">
            create a new Password
          </Typography>}
      </AppForm>
      {/* <AppFooter /> */}
    </React.Fragment>
  );
};

export default withRoot(SignUp);
