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
import { server } from '../UtilitiesFunctions/Function';
import SystemError from './modules/views/Error/SystemError';
import { useNavigate } from 'react-router-dom';
import MessageInfo from './modules/components/MessageInfo';

const  SignUp = ()  =>{
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(``)
  const [loading,setLoading] =React.useState(false)
  const [name,setName] =React.useState()
const navigate = useNavigate()
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

    try {
      setLoading(true)
      await axios.post(`${server}/auth/local/register`, {
        ...values
      });
      setName(`${values.firstname}  ${values.lastname}`)
      setSent(true);
      onSubmitSuccess(values)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErr(`${err }. \n ${JSON.stringify(error?.response?.data?.error?.message)}`)
    }
  };

  const onSubmitSuccess = async (values) =>{
   
    await new Promise((resolve) => setTimeout(resolve,3000))
    setSent(false)
    navigate('/sign-in')
  }

  if(err) return  <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}/>

  if (sent) return    <MessageInfo message={`Please hold while we sign you up, Creating account for :- ${name}`}/>

  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      :
    (  <AppForm>
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
          onSubmitSuccess={onSubmitSuccess} 
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
      </AppForm>)
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(SignUp);
