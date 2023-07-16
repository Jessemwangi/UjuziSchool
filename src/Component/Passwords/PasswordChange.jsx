import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import { required } from '../modules/form/validation';
import AppForm from '../modules/views/AppForm';
import Typography from '../modules/components/Typography';
import RFTextField from '../modules/form/RFTextField';
import FormFeedback from '../modules/form/FormFeedback';
import FormButton from '../modules/form/FormButton';
import withRoot from '../modules/withRoot';

const  SignUp = ()  =>{
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['password', 'password2'], values);

    if (values.password !== values.password2) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = (values) => {
    console.log(values)
    // setSent(true);
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
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
             
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
                {submitting || sent ? 'In progress…' : 'Submit'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(SignUp);
