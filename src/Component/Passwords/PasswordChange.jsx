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
import { server } from "../../UtilitiesFunctions/Function";
import { useNavigate } from "react-router-dom";
import SystemError from "../modules/views/Error/SystemError";
import MessageInfo from "../modules/components/MessageInfo";

const SignUp = () => {
  const [sent, setSent] = React.useState(false);
  const [resetToken, setResetToken] = React.useState('');
  const [resetStatus, setResetStatus] = React.useState('');
  const [err, setErr] = React.useState()
const navigate = useNavigate()

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
     setSent(true);
    try {
        await axios.post(`${server}/auth/reset-password`, {
        password: values.password,
        passwordConfirmation:values.password2,
        code: resetToken,
      });
      setResetStatus('success');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/sign-in')
    } catch (error) {
      console.error(error, 'error message is ', error.response?.data?.error?.message);
      setResetStatus(error.response?.data?.error?.message + 'error');
      setErr(error.response?.data?.error?.message)
    }
  };

if (err) return  <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}/>
if (resetStatus === 'success') return <MessageInfo message="You password was changed successfull, Sign In to continue" backgroundColor={'#BA68C8'} textColor={'#040535'} show={false}/>
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
                label="Confirm Password"
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
