import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import AppForm from "../../../Component/modules/views/AppForm";
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
    user?.id ? `/profiles?populate=*&filters[user]=${user?.id}` : null
  );

    // Set profileId when data is fetched
    useEffect(() => {
      if (!loading && data && data.length > 0) {
        setProfileId(data[0].id);
      }
    }, [data, loading]);

 // Handle errors in a side effect to prevent re-renders
 useEffect(() => {
  if (error) {
    setErr(error?.response?.data?.error?.message || 'An unknown error occurred');
  }
}, [error]);

  if (loading) return <p>Loading</p>;

  const initialValues = {
    country: data[0]?.attributes?.country || "",
    city: data[0]?.attributes?.city || "",
    address: data[0]?.attributes?.address || "",
    postalCode: data[0]?.attributes?.postalCode || "",
    occupation: data[0]?.attributes?.occupation || "",
    pronoun: data[0]?.attributes?.pronoun || "",
    otherName: data[0]?.attributes?.otherName || "",
    phoneNumber: data[0]?.attributes?.phoneNumber || "",
    title: data[0]?.attributes?.title || "",
    imageUrl: data[0]?.attributes?.imageUrl || null,
  };

  const handleSubmit = async (values) => {
    try {
      const data = { ...values, user: [user?.id] };
      if (profileId) {
        await putData(`/profiles/${profileId}`, { data }, user?.jwt);
      } else {
        await postData("/profiles", { data}, user?.jwt);
      }
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response.data.error.message
      );
      console.log(error);
      setErr(error.response.data.error.message);
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
