import React from "react";
import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const initialValues = {
  surname: "",
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

const onSubmit = async (values) => {
  try {
    const response = await axios.post("/profiles", values);
    console.log("Profile created:", response.data);
    // Handle success or navigation to another page
  } catch (error) {
    console.error("Error creating profile:", error);
    // Handle error
  }
};

const Profile = () => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Create Profile
          </Typography>
          <Box mt={2}>
            <Field name="surname" component={TextField} label="Surname" />
            <Field name="country" component={TextField} label="Country" />
            {/* Add other fields similar to the above */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
      )}
    />
  );
};

export default Profile;
