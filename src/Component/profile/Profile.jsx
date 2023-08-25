import React, { useEffect, useState } from "react";
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
import { postData, putData } from "../../UtilitiesFunctions/Function";
import { useFetch } from "../../hooks/useFetch";
import SystemError from "../modules/views/Error/SystemError";





const Profile = () => {

  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(``)
  const [profileId,setProfileId] = useState()
const {user} =useUser()

const  {data,loading, error} = useFetch(user?.id ? `/profiles?populate=*&filters[user]=${user?.id}` : null)

useEffect(() => {
  if (data.length > 0) {
    setProfileId(data[0].id);
  }
}, [data])

if(!user) return <><h1>no user logged in</h1></>
if (loading) return <p>Loading</p>


const initialValues = {
  country: data[0]?.attributes?.country || "",
  city: data[0]?.attributes?.city || "eldoret",
  address:data[0]?.attributes?.address || "",
  postalCode:data[0]?.attributes?.postalCode || "",
  occupation:data[0]?.attributes?.occupation || "fdgfgfg",
  pronoun:data[0]?.attributes?.pronoun || "",
  otherName:data[0]?.attributes?.otherName || "",
  phoneNumber:data[0]?.attributes?.phoneNumber || "",
  title:data[0]?.attributes?.title || "",
  imageUrl:data[0]?.attributes?.imageUrl || null,
};

  const handleSubmit = async (values) => {
    try {
      const data ={...values, user:[user?.id]}
      console.log(data)
      let response;
      if(profileId){
        response = await putData(`/profiles/${profileId}`, {data}, user?.jwt);
      }
      else{
        response = await postData("/profiles", {data}, user?.jwt);
      }
      console.log("Profile created:", response.data);
    
    } catch (error) {
      console.error("Error creating profile:", error.response.data.error.message);
      console.log(error)
      setErr(error.response.data.error.message)
    }
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

  if(err) return  <SystemError errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}/>
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
            value={initialValues.country}
          label="Choose a country"
            size ="medium"
          />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="city"
                value={initialValues.city}
                autoComplete="address-level2"
                label="city / Town"
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
              value={initialValues.occupation}
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
