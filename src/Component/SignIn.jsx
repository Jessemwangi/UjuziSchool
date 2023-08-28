import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "./modules/components/Typography";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import { get_Data, postData } from "../UtilitiesFunctions/Function";
import {
  secureJWTAndID,
} from "../UtilitiesFunctions/secureUserData";
import Snackbar from "./modules/components/Snackbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import SystemError from "./modules/views/Error/SystemError";

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const [err, setErr] = React.useState();
  const [,setSnackbarOpen] =React.useState(false)
  const navigate = useNavigate()
  const { updateUser } = useUser();
  const validate = (values) => {
    const errors = required(["email", "password"], values);

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
      const response = await postData(`/auth/local?populate=*`, {
        identifier: values.email,
        password: values.password,
      });

      const userinfo =await get_Data(`/users/${response.user.id}?populate=*`,response.jwt)
      console.log(userinfo)
      // await secureUserUid(response); profilePic.url
       await secureJWTAndID(response.jwt, response.user.id);
      updateUser({...response.user,jwt:response.jwt, profileUrl:userinfo.profilePic.url, profilePic:userinfo.id,profile:userinfo?.profile});
      setSent(true);
      setLoading(false);
      setSnackbarOpen(true)
      navigate('/member')
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.error?.message);
      setLoading(false);
    }
  };

  if (err)  return <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}` }/>
  return (
    <React.Fragment>
      {/* <AppAppBar /> */}
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
       
<Snackbar message="Login successful!" closeFunc={() => setSnackbarOpen(false)} />

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
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      {/* <AppFooter /> */}
    </React.Fragment>
  );
}

export default withRoot(SignIn);
