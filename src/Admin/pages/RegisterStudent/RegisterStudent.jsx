import React from "react";
import RFTextField from "../../../Component/modules/form/RFTextField";
import MessageInfo from "../../../Component/modules/components/MessageInfo";
import SystemError from "../../../Component/modules/views/Error/SystemError";
import Typography from "../../../Component/modules/components/Typography";
import { Box, Grid } from "@mui/material";
import { Field, Form, FormSpy } from "react-final-form";
import FormFeedback from "../../../Component/modules/form/FormFeedback";
import FormButton from "../../../Component/modules/form/FormButton";
import { postData } from "../../../UtilitiesFunctions/Function";
import { required } from "../../../Component/modules/form/validation";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/UserContext";

const RegisterStudent = () => {
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(``);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reg = searchParams.get("reg");
  const navigate = useNavigate();
  const { user } = useUser();

  const validate = (values) => {
    const errors = required(
      ["studentName", "studentPassword", "studyLevel"],
      values
    );
    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        agents_detail:user.id
      }
      await postData(`/student/sign-up`, { data }, user?.jwt);
      // await axios.post(`${server}/student/sign-up`, data);
      setName(values.studentName);
      setSent(true);
      onSubmitSuccess(values);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(
        `${err}. \n ${JSON.stringify(
          error?.response?.data?.error?.message ||
            error?.response.data.message ||
            error?.response.data
        )}`
      );
    }
  };

  const onSubmitSuccess = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSent(false);
    navigate(
      `/member/admin/student?reg=Account ${values.studentName} Created successfully , Add Another Account`
    );
  };

  if (err)
    return (
      <SystemError
        errorMessage={`OOPPs! our bad, Landed into an error : ${err}`}
      />
    );

  if (sent)
    return (
      <MessageInfo
        message={`Please hold while we create, Creating account for :- ${name}`}
      />
    );
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom marked="center" align="center">
        {reg}
      </Typography>
      <Typography variant="body2" align="center" underline="always">
        Remember to share this details with the students
      </Typography>

      <Form
        onSubmit={handleSubmit}
        onSubmitSuccess={onSubmitSuccess}
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
              name="studentName"
              autoComplete="studentName"
              label="student Name"
              margin="normal"
            />
            <Field
              fullWidth
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="studentPassword"
              autoComplete="new-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  autoComplete="studyLevel"
                  fullWidth
                  label="study Level"
                  name="studyLevel"
                  required
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
              {submitting || sent ? "In progress…" : "Create Student"}
            </FormButton>
          </Box>
        )}
      </Form>
    </React.Fragment>
  );
};

export default RegisterStudent;
