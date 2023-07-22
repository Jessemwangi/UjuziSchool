import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import axios from 'axios';

const  SignUp = ()  =>{
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(``)
  const server =process.env.REACT_APP_SERVER_URL

  const validate = (values) => {
    const errors = required(['username','firstname', 'lastname', 'email', 'password'], values);


    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    console.log(values)
    setSent(true);
    try {
      const response = await axios.post(`${server}/auth/local/register`, {
        ...values
      });
      console.log(response.data);
    } catch (error) {
      console.log(error)
      setErr(`${err }. \n ${JSON.stringify(error.response.data.error.message)}`)
    }
  };

  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstname"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Other name"
                    name="lastname"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="username"
                autoComplete="username"
                label="User name"
                margin="normal"
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
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
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
        <>{err && err}</>
      </AppForm>
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(SignUp);
