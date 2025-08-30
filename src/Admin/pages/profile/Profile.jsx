import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Grid, Link } from "@mui/material";
import RFTextField from "../../../Component/modules/form/RFTextField";
import FormFeedback from "../../../Component/modules/form/FormFeedback";
import FormButton from "../../../Component/modules/form/FormButton";
import { email, required } from "../../../Component/modules/form/validation";
import { useUser } from "../../../hooks/UserContext";
import CountrySelect from "../../../Component/modules/components/Country";
import Typography from "../../../Component/modules/components/Typography";
import { postData, putData } from "../../../UtilitiesFunctions/Function";
import { useFetch } from "../../../hooks/useFetch";
import SystemError from "../../../Component/modules/views/Error/SystemError";

const Profile = () => {
  const [sent] = React.useState(false);
  const [err, setErr] = React.useState(``);
  const [profileId, setProfileId] = useState();
  const { user } = useUser();

  const { data, loading, error } = useFetch(
    user?.id ? `/users/${user?.id}?populate=*` : null
  );

    // Set profileId when data is fetched
    useEffect(() => {
      if (!loading && !error && data) {
        setProfileId(data?.profile?.id);
      }
    }, [data, error, loading]);

 // Handle errors in a side effect to prevent re-renders
 useEffect(() => {
  if (error) {
    setErr(error?.response?.data?.error?.message || 'An unknown error occurred');
  }
}, [error]);

  if (loading) return <p>Loading</p>;



  const handleSubmit = async (values) => {
    try {
      const data = { ...values, user: [user?.id] };
      if (profileId) {
        await putData(`/profiles/${profileId}`, { data }, user?.jwt);
      } else {
        await postData("/profiles", { data}, user?.jwt);
      }
    } catch (error) {
      setErr(error.response.data.error.message || 'An unknown error occurred');
    }
  };

  const validate = (values) => {
    const errors = required(
      [
        "country",
        "city",
        "address",
        "postalCode",
        "occupation",
        "pronoun",
        "phoneNumber",
        "title",
      ],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  if (err)
    return (
      <SystemError
        errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}
      />
    );

      const initialValues = {
    country: data?.profile?.country || "",
    city: data?.profile?.city || "",
    address: data?.profile?.address || "",
    postalCode: data?.profile?.postalCode || "",
    occupation: data?.profile?.occupation || "",
    pronoun: data?.profile?.pronoun || "",
    otherName: data?.profile?.otherName || "",
    phoneNumber: data?.profile?.phoneNumber || "",
    title: data?.profile?.title || "",
    imageUrl: data?.profile?.imageUrl || null,
  };

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        Create a Profile
      </Typography>
      <Typography variant="body2" align="center" sx={{ cursor: "pointer" }}>
        <Link
          href={`/delete/${user?.id}`}
          underline="always"
          style={{ color: "red", cursor: "pointer" }}
        >
          You can delete your account anytime
        </Link>
      </Typography>
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit: handleSubmit2, submitting }) => (
          <form onSubmit={handleSubmit2} noValidate>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="city"
                  autoComplete="address-level2"
                  label="City / Town"
                  margin="normal"
                />
                {/* Add more fields for the left column */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="country"
                  component={CountrySelect}
                  autoComplete="country"
                  disabled={submitting || sent}
                  margin="normal"
                  label="Choose a country"
                  size="medium"
                />{" "}
              </Grid>
              <Grid item xs={12} sm={6} sx={{ marginTop: "-16px" }}>
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
              </Grid>
              <Grid item xs={12} sm={6} sx={{ marginTop: "-16px" }}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="postalCode"
                  autoComplete="postal-code"
                  label="postalCode"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="occupation"
                  autoComplete="organization"
                  label="occupation"
                  value={initialValues.occupation}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="pronoun"
                  autoComplete="honorific-prefix"
                  label="pronoun"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              disabled={submitting || sent}
              color="secondary"
              fullWidth
            >
              {submitting || sent ? "In progress…" : "Save Profile"}
            </FormButton>
          </form>
        )}
      </Form>
    </React.Fragment>
  );
};

export default Profile;
