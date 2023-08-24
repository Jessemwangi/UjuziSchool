import React from "react";
import { Form, Field, FormSpy, useForm } from "react-final-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import AppForm from "../modules/views/AppForm";
import { Grid, Link } from "@mui/material";
import RFTextField from "../modules/form/RFTextField";
import FormFeedback from "../modules/form/FormFeedback";
import FormButton from "../modules/form/FormButton";
import { email, required } from "../modules/form/validation";
import { useUser } from "../../hooks/UserContext";
import CountrySelect from "../modules/components/Country";
import Typography from "../modules/components/Typography";





const Profile = () => {

  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(``)
const {user} =useUser()
const initialValues = {
  country: "",
  city: "",
  address: "",
  postalCode: "",
  occupation: "",
  pronoun: "",
  otherName: "",
  phoneNumber: "",
  title: "",
  imageUrl: null,
};
  const handleSubmit = async (values) => {
    console.log(user,{...values, surname:user.lastname},user.lastname )
    // {try {
    //   const response = await axios.post("/profiles", values);
    //   console.log("Profile created:", response.data);
    
    // } catch (error) {
    //   console.error("Error creating profile:", error);
    
    // }}
  };

  const validate = (values) => {
    const errors = required(['country','city', 'address', 'postalCode', 'occupation','pronoun','phoneNumber','title'], values);
console.log(values)
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

 
  return (
    <React.Fragment>
    <AppForm>
    <React.Fragment>
      <Typography variant="h3" gutterBottom marked="center" align="center" >
        Create a Profile
      </Typography>
      <Typography variant="body2" align="center">
        <Link href={`/delete/${user?.id}`}  underline="always">
          you can delete your account anytime
        </Link>
      </Typography>
    </React.Fragment>
    <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
          initialValues={initialValues}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box  xs={12}  component="form" onSubmit={handleSubmit2}  noValidate sx={{ mt: 6 }}>

                <Field
            name="country"
            component={CountrySelect} // Use the custom input component
            autoComplete="country"
            disabled={submitting || sent}
            margin="normal"
          label="Choose a country"
            size ="medium"
          />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="city"
                autoComplete="address-level2"
                label="city"
                margin="normal"
              />
                            <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="address"
                autoComplete="street-address"
                label="address"
                margin="normal"
              />
                            <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="postalCode"
                autoComplete="postal-code"
                label="postalCode"
                margin="normal"
              />              <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="occupation"
              autoComplete="organization"
              label="occupation"
              margin="normal"
            />              <Field
            fullWidth
            component={RFTextField}
            disabled={submitting || sent}
            required
            name="pronoun"
            autoComplete="honorific-prefix"
            label="pronoun"
            margin="normal"
          />
              <Field
                autoComplete="tel"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="phoneNumber"
                margin="normal"
                name="phoneNumber"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="title"
                autoComplete="title"
                label="title"
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
                {submitting || sent ? 'In progress…' : 'save profile'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      </React.Fragment>
  );
};

export default Profile;
